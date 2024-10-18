import { User } from "../models/userModal.ts";

const users: User[] = [];

const getUsers = () => {
  return users;
};

const getUser = (userId: string) => {
  return users.find((user) => user.id === userId);
};

const create = (user: User) => {
  users.push(user);
};

const update = (user: Partial<User>) => {
  const index = users.findIndex((u) => u.id === user.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...user };
  }
};

const deleteUser = (userId: string) => {
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return false;
  }

  users.splice(userIndex, 1);
  return true;
};


const userRepository = {
  getUsers,
  getUser,
  create,
  update,
  deleteUser,
};


export default userRepository;