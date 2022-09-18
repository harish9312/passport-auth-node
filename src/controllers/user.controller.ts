import { User } from "../models/user.model";
import { IUser, ICredentials } from "../types/user.types";
import { EUserResponse, UserResponse } from "../response/user.response";

const create = (user: IUser) => {
  return User.create(user);
};

const getUser = () => User.findAll();
const updateUser = async (user: ICredentials, registeredUser: IUser) => {
  const result = await User.update(user, { where: { id: user.id } });
  return result;
};
const deleteUser = async (id: number) => {
  const result = await User.destroy({ where: { id: id } });
  return result;
};
const getOne = async (email: string) => {
  const user = await User.findOne({ where: { email: email }});

  return user;
};

export default {
  create,
  getUser,
  updateUser,
  deleteUser,
  getOne
};
