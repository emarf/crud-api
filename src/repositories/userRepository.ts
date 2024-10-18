import { User } from "../models/userModal.ts";

const users: User[] = [];

const getUsers = () => {
  return users;
};

const create = (user: User) => {
  users.push(user);
}


const userRepository = {
  getUsers,
  create,
}


export default userRepository;