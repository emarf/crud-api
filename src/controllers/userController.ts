import { IncomingMessage, ServerResponse } from "node:http";
import userService from "../services/userService";
import { StatusCode } from "../utils/constants";
import { handleError } from "../utils/helpers";
import userUtils from "../utils/userUtils";

const getUsers = (_: IncomingMessage, res: ServerResponse) => {
  try {
    const users = userService.getAllUsers();

    res.writeHead(StatusCode.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    handleError(res, error);
  }
};

const getUser = (_: IncomingMessage, res: ServerResponse, userId: string) => {
  try {
    const user = userService.getUserById(userId);

    res.writeHead(StatusCode.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (error) {
    handleError(res, error);
  }
};

const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const userData = await userUtils.collectUserData(req);
    const user = userService.createUser(userData);

    res.writeHead(StatusCode.CREATED, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (error) {
    handleError(res, error);
  }
};

const updateUser = async (req: IncomingMessage, res: ServerResponse, userId: string) => {
  try {
    const userData = await userUtils.collectUserData(req);
    const user = userService.updateUser(userData, userId);

    res.writeHead(StatusCode.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } catch (error) {
    handleError(res, error);
  }
};

const deleteUser = (_: IncomingMessage, res: ServerResponse, userId: string) => {
  try {
    userService.deleteUser(userId);

    res.writeHead(StatusCode.NO_CONTENT);
    res.end();
  } catch (error) {
    handleError(res, error);
  }
};


const userController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};

export default userController;