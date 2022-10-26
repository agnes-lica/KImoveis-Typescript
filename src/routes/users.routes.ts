import { Router } from "express";

import {
  createUserController,
  deleteUserController,
  listAllUsersController,
  updateUserController,
} from "./../controllers/users.controller";

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const routeUsers = Router();

//ROTA DE CRIAÇÃO DE USUÁRIO
routeUsers.post("", createUserController);
//ROTA DE LISTAGEM DE TODOS OS USUÁRIOS
routeUsers.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listAllUsersController
);
//ROTA DE ATUALIZAÇÃO DE DADOS DE UM USUÁRIO
routeUsers.patch("/:id", ensureAuthMiddleware, updateUserController);
//ROTA DE DELEÇÃO (ATUALIZAÇÃO PARA INACTIVE) DE UM USUÁRIO
routeUsers.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  deleteUserController
);

export default routeUsers;
