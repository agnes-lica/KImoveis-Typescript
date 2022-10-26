import { IUserResponse } from "./../interfaces/users copy/index";
import { hash } from "bcrypt";

import AppError from "../erros/appError";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { IUserRequest, IUserUpdate } from "./../interfaces/users/index";

//CRIAÇÃO DE USUÁRIO
export const createUserService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  if (!password) {
    throw new AppError("Password is missing!", 400);
  }

  const findUser = await userRepository.findOneBy({
    email,
  });

  if (findUser) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
    isAdm,
  });

  await userRepository.save(user);

  return user;
};

//LISTAR TODOS OS USUÁRIOS
export const listAllUsersService = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  return users;
};

//ATUALIZAÇÃO DE USUÁRIO
export const updateUserService = async (
  user: IUserUpdate,
  id: string,
  isAdm: boolean,
  idUserToken: string
) => {
  const userKeys = Object.keys(user);
  const canUpdateIsAdm = userKeys.includes("isAdm");
  const canUpdateId = userKeys.includes("id");
  const canUpdateIsActive = userKeys.includes("isActive");

  if (canUpdateIsAdm || canUpdateId || canUpdateIsActive) {
    throw new AppError("Unauthorized token!", 401);
  }

  const name = user.name;
  const email = user.email;
  const password = user.password;

  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    throw new AppError("User not found!", 404);
  }

  if (!isAdm && id !== idUserToken) {
    throw new AppError("Unauthorized token!", 401);
  }

  await userRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    password: password ? await hash(password, 10) : findUser.password,
  });

  const userUpdated = await userRepository.findOneBy({ id });

  //const userUpdatedReturn = { ...userUpdated };
  //delete userUpdatedReturn.password;

  /* const userUpdatedReturn = JSON.parse(JSON.stringify(userUpdated));
  delete userUpdatedReturn.password; */

  //console.log(userUpdatedReturn.password);
  return userUpdated!;
};

//DELEÇÃO DE USUÁRIO
export const deleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    throw new AppError("User not found!", 404);
  }

  if (!findUser.isActive) {
    throw new AppError("This user is already inactive!", 400);
  }

  await userRepository.update(id, {
    isActive: false,
  });
};
