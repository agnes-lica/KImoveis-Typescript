import {
  IProperty,
  IPropertyRequest,
  IAddressRequest,
} from "./../interfaces/properties/index";
import AppError from "../erros/appError";
import AppDataSource from "../data-source";
import { Properties } from "../entities/properties.entity";
import { Addresses } from "../entities/addresses.entity";
import { Categories } from "../entities/categories.entity";

//CRIAÇÃO DE IMOVEL
export const createPropertieService = async ({
  value,
  size,
  address,
  categoryId,
}: IPropertyRequest) => {
  const propertieRepository = AppDataSource.getRepository(Properties);
  const addressRepository = AppDataSource.getRepository(Addresses);
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const category = await categoriesRepository.findOneBy({ id: categoryId });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  if (address.state.length > 2) {
    throw new AppError("State not exists!", 400);
  }

  if (address.zipCode.length > 8) {
    throw new AppError("Zip code invalid!", 400);
  }

  const findAdress = await addressRepository.findOneBy({
    zipCode: address.zipCode,
    number: address.number,
    city: address.city,
    state: address.state,
    district: address.district,
  });

  if (findAdress) {
    throw new AppError("There is already a propertie with this address!", 400);
  }

  const addressCreated: IAddressRequest = {
    zipCode: address.zipCode,
    state: address.state,
    number: address.number,
    city: address.city,
    district: address.district,
  };

  const savedAddress = await addressRepository.save(addressCreated);

  const propertie = await propertieRepository.save({
    value,
    size,
    address: savedAddress,
    category,
  });
  return propertie;
};

//LISTAGEM DE TODOS OS IMOVEIS
export const listAllPropertiesService = async (): Promise<Properties[]> => {
  const propertieRepository = AppDataSource.getRepository(Properties);

  const propertie = await propertieRepository.find({
    relations: {
      category: true,
    },
  });

  return propertie;
};
