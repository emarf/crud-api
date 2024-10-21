export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export interface CustomError extends Error {
  statusCode: number;
  message: string;
};