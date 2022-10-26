import {
  createCategoryService,
  listAllCategoriesService,
  listAllPropertiesFromCategoryService,
} from "./../services/categories.services";
import { Request, Response } from "express";

import { ICategoryRequest } from "../interfaces/categories";
//CRIAÇÃO DE USUÁRIO
export const createCategoryController = async (req: Request, res: Response) => {
  const category: ICategoryRequest = req.body;
  const createdCategory = await createCategoryService(category);
  return res.status(201).json(createdCategory);
};

//LISTAGEM DE TODAS AS CATEGORIAS
export const listAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  const categories = await listAllCategoriesService();
  return res.json(categories);
};

//LISTAGEM DE TODOS OS IMOVEIS DE UMA CATEGORIA
export const listAllPropertiesFromCategoryController = async (
  req: Request,
  res: Response
) => {
  const categoryId: string = req.params.id;
  const allProperties = await listAllPropertiesFromCategoryService(categoryId);
  return res.json(allProperties);
};
