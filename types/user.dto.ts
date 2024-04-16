export interface UserDto {
  id: number;
  username: string;
  password: string;
}

export interface Token {
  token: string;
  userId: number;
}
