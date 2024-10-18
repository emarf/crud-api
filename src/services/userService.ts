import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/userModal.ts";
import userRepository from "../repositories/userRepository.ts";
import { StatusCode } from '../utils/constants.ts';
import { throwError } from '../utils/helpers.ts';
import userUtils from '../utils/userUtils.ts';

const getAllUsers = () => {
  return userRepository.getUsers();
};

const getUserById = (userId: string) => {
  userUtils.validateUserId(userId);

  const user = userRepository.getUser(userId);

  if (!user) {
    throwError(StatusCode.NOT_FOUND, 'User not found');
  }

  return user;
};

const createUser = (userData: User) => {
  const { username, age, hobbies } = userData;

  userUtils.validateUserFields(userData, false);

  const user = { id: uuidv4(), username, age, hobbies };

  userRepository.create(user);
  return user;
};

const updateUser = (userData: Partial<User>, userId: string) => {
  userUtils.validateUserId(userId);

  const { username, age, hobbies } = userData;

  userUtils.validateUserFields(userData, true);

  const user = userRepository.getUser(userId);

  if (!user) {
    throwError(StatusCode.NOT_FOUND, 'User not found');
  }

  const updatedUser = { ...user, username, age, hobbies };
  userRepository.update(updatedUser);

  return updatedUser;
};

const deleteUser = (userId: string) => {
  userUtils.validateUserId(userId);

  const deleted = userRepository.deleteUser(userId);

  if (!deleted) {
    throwError(StatusCode.NOT_FOUND, 'User not found');
  }
};


const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};

export default userService;