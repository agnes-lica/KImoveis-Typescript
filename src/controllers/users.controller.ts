import {
  createUserService,
  deleteUserService,
  listAllUsersService,
  updateUserService,
} from "./../services/users.services";
import { Request, Response } from "express";
import {
  classToClassFromExist,
  classToPlain,
  instanceToPlain,
  serialize,
} from "class-transformer";

import { IUserRequest, IUserUpdate } from "./../interfaces/users/index";

//CRIAÇÃO DE USUÁRIO
export const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const createdUser = await createUserService(user);
  return res.status(201).json(instanceToPlain(createdUser));
};

//LISTAR TODOS OS USUÁRIOS
export const listAllUsersController = async (req: Request, res: Response) => {
  const users = await listAllUsersService();
  return res.json(instanceToPlain(users));
};

//ATUALIZAÇÃO DE USUÁRIO
export const updateUserController = async (req: Request, res: Response) => {
  const id = req.user.id;
  const isAdm = req.user.isAdm;
  const user: IUserUpdate = req.body;

  const idUserToUpdate: string = req.params.id;
  const updatedUser = await updateUserService(user, idUserToUpdate, isAdm, id);
  //delete updatedUser.password;
  return res.json(instanceToPlain(updatedUser));
};

//DELEÇÃO DE USUÁRIO
export const deleteUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const deletedUser = await deleteUserService(id);
  return res.status(204).json({ message: "User deleted!" });
};
