import { Router } from "express";

import {
  createCategoryController,
  listAllCategoriesController,
  listAllPropertiesFromCategoryController,
} from "./../controllers/categories.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const routeCategories = Router();

//ROTA DE CRIAÇÃO DE CATEGORIA
routeCategories.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createCategoryController
);

//ROTA DE LISTAGEM DE TODAS AS CATEGORIAS
routeCategories.get("", listAllCategoriesController);

//ROTA DE LISTAGEM DE TODOS OS IMOVEIS QUE PERTENCEM A UMA CATEGORIA
routeCategories.get("/:id/properties", listAllPropertiesFromCategoryController);

export default routeCategories;
