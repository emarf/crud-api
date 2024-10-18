import { v4 as uuidv4 } from 'uuid';
import { User } from "../models/userModal.ts";
import userRepository from "../repositories/userRepository.ts";

const getAllUsers = () => {
  return userRepository.getUsers();
};

const createUser = (userData: User) => {
  const { username, age, hobbies } = userData;

  if (!username || !age || !hobbies) {
    throw { statusCode: 400, message: 'Missing required fields' };
  }

  if (typeof username !== 'string') {
    throw { statusCode: 400, message: 'Username field must be a string' };
  }

  if (typeof age !== 'number') {
    throw { statusCode: 400, message: 'Age field must be a number' };
  }

  if (!Array.isArray(hobbies) || hobbies.some((hobby) => typeof hobby !== 'string')) {
    throw { statusCode: 400, message: 'Hobbies field must be an array of strings' };
  }
  const user = { id: uuidv4(), username, age, hobbies };

  userRepository.create(user);
  return user;
};


const userService = {
  getAllUsers,
  createUser
};

export default userService;