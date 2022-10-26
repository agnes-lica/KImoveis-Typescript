import { ICategory, ICategoryRequest } from "./../interfaces/categories/index";

import { Categories } from "../entities/categories.entity";
import { Properties } from "../entities/properties.entity";

import AppError from "../erros/appError";
import AppDataSource from "../data-source";

//CRIAÇÃO DE CATEGORIA
export const createCategoryService = async ({
  name,
}: ICategoryRequest): Promise<ICategory> => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const findCategorie = await categoryRepository.findOneBy({
    name,
  });

  if (findCategorie) {
    throw new AppError("Category already exists", 400);
  }

  const category = categoryRepository.create({
    name,
  });

  await categoryRepository.save(category);

  return category;
};

//LISTAGEM DE TODAS AS CATEGORIAS
export const listAllCategoriesService = async (): Promise<Categories[]> => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const categories = await categoryRepository.find();

  return categories;
};

//LISTAGEM DE TODOS OS IMOVEIS DE UMA CATEGORIA
export const listAllPropertiesFromCategoryService = async (
  categoryId: string
): Promise<Categories> => {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const findCategories = await categoriesRepository.findOne({
    where: { id: categoryId },
    relations: { properties: true },
  });

  if (!findCategories) {
    throw new AppError("Category not found", 404);
  }

  return findCategories;
};
