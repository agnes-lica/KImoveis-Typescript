import {
  createPropertieService,
  listAllPropertiesService,
} from "./../services/properties.services";
import {
  IPropertyRequest,
  IAddressRequest,
} from "./../interfaces/properties/index";
import { Request, Response } from "express";

//CRIAÇÃO DE IMOVEL
export const createPropertieController = async (
  req: Request,
  res: Response
) => {
  const { value, size, address, categoryId } = req.body;
  const createPropertie = await createPropertieService({
    value,
    size,
    address,
    categoryId,
  });

  return res.status(201).json(createPropertie);
};

//LISTAGEM DE TODOS OS IMOVEIS
export const listAllPropertiesController = async (
  req: Request,
  res: Response
) => {
  const properties = await listAllPropertiesService();
  return res.json(properties);
};
