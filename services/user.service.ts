import prisma from "./prismaClient.service";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        profileImageUrl: true,
      },
    })
    return users;
  } catch (error) {
    console.error("Failed to retrieve users:", error);
    throw error;
  }
}

export async function getUserById(userId: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        profileImageUrl: true,
        role: true
      },
    });
    if (user) {
      return user;
    } else {
      throw new Error(`User with ID ${userId} not found`);
    }
  } catch (error) {
    console.error(`Failed to retrieve user with ID ${userId}:`, error);
    throw error;
  }
}

export async function changeProfileImage(userId: number, imageUrl: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profileImageUrl: imageUrl,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error(
      `Failed to update profile image for user with ID ${userId}:`,
      error,
    );
    throw error;
  }
}
