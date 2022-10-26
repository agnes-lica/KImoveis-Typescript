import {
  createPropertieController,
  listAllPropertiesController,
} from "./../controllers/properties.controller";
import { Router } from "express";

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const routeProperties = Router();

//ROTA DE CRIAÇÃO DE IMÓVEL
routeProperties.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createPropertieController
);

//ROTA DE LISTAGEM DE TODOS OS IMOVEIS
routeProperties.get("", listAllPropertiesController);

export default routeProperties;
