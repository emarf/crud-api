import { IncomingMessage, ServerResponse } from "node:http";
import userService from "../services/userService.ts";
import userUtils from "../utils/userUtils.ts";
import { CustomError } from "../models/userModal.ts";

const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  const users = userService.getAllUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const userData = await userUtils.collectUserData(req);
    const user = userService.createUser(userData);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (error) {
    handleError(res, error);
  }
};

function handleError(res: ServerResponse, error: unknown): void {
  if (isCustomError(error)) {
    res.statusCode = error.statusCode;
    res.end(JSON.stringify({ message: error.message }));
  } else {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
}

function isCustomError(error: unknown): error is CustomError {
  return typeof error === 'object' && error !== null && 'statusCode' in error;
}

const userController = {
  getUsers,
  createUser
};

export default userController;