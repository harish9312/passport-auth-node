import { IUser, ICredentials } from "../types/user.types";
import userRepo from "../controllers/user.controller";
import { EUserResponse, UserResponse } from "../response/user.response";
import { sign } from "jsonwebtoken";
import { User } from "../models/user.model";
import { compare, genSalt, hash, hashSync } from "bcrypt";
import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import { genSaltSync } from "bcryptjs";

const create = async (user: IUser) => {
  if (user.password === user.repeatPaswword) {
    const salt = await genSalt(10);
    const hashedPassword = await hashSync (user.password, genSaltSync(10));
    user.password = hashedPassword;
    const createdUserData = userRepo.create(user);
    return createdUserData;
  } else {
    throw UserResponse[EUserResponse.NOT_ACCEPTABLE];
  }
};
const getUser = () => {
  return userRepo.getUser();
};
const updateUSer = async (user: ICredentials, registeredUser: IUser) => {
  if (user.password === user.repeatPaswword && !user.email) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(user.password, salt);
    user.password = hashedPassword;
    return userRepo.updateUser(user, registeredUser);
  } else if (user.email) {
    throw UserResponse[EUserResponse.CANNOT_UPDATE];
  } else {
    throw UserResponse[EUserResponse.NOT_ACCEPTABLE];
  }
};
const login = async (email: any, password: any, done: any) => {
  try {
    console.log("reached");
    //   // 1. if the user with the email exists
    const user = await userRepo.getOne(email);
    // console.log('%%%',credentials.email);

    console.log(user);
    if (!user) {
      // throw an error
      throw UserResponse[EUserResponse.LOGIN_FAILED];
    }

    //   // 2. compare the passwords
    var didMatch = await compare(password, user.get("password") as string);
    if (!didMatch) {
      // throw an error
      throw UserResponse[EUserResponse.LOGIN_FAILED];
    }
    return user ? done(null, user) : done(null, false);
  } catch (error) {
    console.log("login", error);
  }
};

const getToken = (user: any) => {
  if (!user) throw UserResponse[EUserResponse.LOGIN_FAILED];
  return { token: sign(user, process.env.SECRET_KEY || "") };
};

const deleteUser = (id: number) => userRepo.deleteUser(id);
export default {
  create,
  getUser,
  updateUSer,
  deleteUser,
  login,
  getToken,
};
