import { User } from "../models/userModal";

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

  if (index === -1) {
    return null;
  }

  const existingUser = users[index];

  const updatedUser = {
    ...existingUser,
    ...user,
  };

  users[index] = updatedUser;
  return updatedUser;
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