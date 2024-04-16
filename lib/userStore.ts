import { UserDto, Token } from "../types";
import bcrypt from "bcrypt";

const users: UserDto[] = [
  { id: 1, username: "testuser", password: "password123" },
];

const tokens: Token[] = [];

export const findUserByUsername = (username: string): UserDto | undefined =>
  users.find((user) => user.username === username);

export const addUser = async (
  username: string,
  password: string,
): Promise<UserDto> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: UserDto = {
    id: users.length + 1,
    username,
    password: hashedPassword,
  };
  users.push(newUser);
  return newUser;
};

export const storeToken = (token: string, userId: number): string => {
  tokens.push({ token, userId });
  return token;
};

export const verifyToken = (token: string): Token | undefined =>
  tokens.find((t) => t.token === token);
