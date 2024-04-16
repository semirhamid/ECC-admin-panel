import { getUserById } from "./user.service";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcrypt";
import prisma from "./prismaClient.service";

const JWT_SECRET = process.env.JWT_SECRET || "";
const secretKey = new TextEncoder().encode(JWT_SECRET);
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const generateToken = async (userId: number): Promise<string> => {
  const user = await getUserById(userId);
  const expirationTime = Math.floor(Date.now() / 1000) + 27 * 24 * 60 * 60;

  const jwtConstructor = new SignJWT({
    id: userId,
    email: user?.email,
    name: user?.name,
    phoneNumber: user?.phoneNumber,
    role: user?.role
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expirationTime);

  return jwtConstructor.sign(secretKey);
};

export const verifyToken = async (token: string): Promise<number | null> => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET),
      {
        algorithms: ["HS256"],
      },
    );
    return payload.id as number;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

export const createUser = async (
  email: string,
  password: string,
  phoneNumber: string,
  name: string,
) => {
  console.log(email, password, phoneNumber, name);
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user
    .create({
      data: {
        email,
        password: hashedPassword,
        phoneNumber,
        name,
      },
    })
    .catch((err) => {
      console.error(err);
      throw new Error("Error creating user");
    })
  return user;
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
};

export const signInUser = async (
  email: string,
  password: string,
): Promise<string | null> => {
  const user = await getUserByEmail(email);
  if (!user?.accountStatus) {
    throw new Error("User account is deleted")
  }
  if (!user) return null;
  const isValid = await validatePassword(user.password, password);
  if (!isValid) return null;

  return await generateToken(user.id);
};
export const validatePassword = async (
  userPassword: string,
  inputPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(inputPassword, userPassword);
};


export async function deactivateUserAccount(userId: number): Promise<string> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    }).finally(async () => {
      await prisma.$disconnect();
    });

    if (!existingUser) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        accountStatus: false,
      },
    })
    return `User account with ID ${userId} has been deactivated successfully.`;
  } catch (error) {
    console.error(`Failed to deactivate user account with ID ${userId}:`, error);
    throw error;
  }
}
