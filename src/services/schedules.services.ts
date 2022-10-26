import { IScheduleRequest } from "./../interfaces/schedules/index";
import AppError from "../erros/appError";
import AppDataSource from "../data-source";
import { Properties } from "../entities/properties.entity";
import { Schedules_users_properties } from "../entities/schedules_users_properties.entity";
import { User } from "../entities/user.entity";

//CRIAÇÃO DE IMOVEL
export const createScheduleService = async (
  hourRequest: Date,
  dateRequest: Date,
  propertyIndex: string,
  userIndex: string
) /* : Promise<IScheduleRequest> */ => {
  const propertieRepository = AppDataSource.getRepository(Properties);
  const userRepository = AppDataSource.getRepository(User);
  const SchedulesRepository = AppDataSource.getRepository(
    Schedules_users_properties
  );

  const dateToSchedule = new Date(`${dateRequest} ${hourRequest}`);
  const dayToSchedule = dateToSchedule.getDay();
  const hourToSchedule = dateToSchedule.getHours();

  if (dayToSchedule === 0 || dayToSchedule === 6) {
    throw new AppError("You can only schedule a visit in week days", 400);
  }

  if (hourToSchedule >= 18 || hourToSchedule < 8) {
    throw new AppError("You can only schedule a visit in bussiness hours", 400);
  }

  const findUser = await userRepository.findOneBy({ id: userIndex });

  const findProperty = await propertieRepository.findOneBy({
    id: propertyIndex,
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  if (!findProperty) {
    throw new AppError("Property not found", 404);
  }

  const scheduleExists = await SchedulesRepository.find({
    where: { hour: hourRequest, date: dateRequest },
    relations: {
      property: true,
    },
  });

  const existentSchedule = scheduleExists[0];

  if (existentSchedule != undefined) {
    throw new AppError(
      "There is already a visitation in this place at this date and hour",
      400
    );
  }

  const newSchedule = SchedulesRepository.create({
    hour: hourRequest,
    date: dateRequest,
    user: findUser,
    property: findProperty,
  });

  const savedSchedule = await SchedulesRepository.save(newSchedule);

  return savedSchedule;
};

//LISTAGEM DE TODOS OS AGENDAMENTO DE UM IMOVEL
export const listAllSchedulesFromPropertyService = async (
  propertyIdRequest: string
): Promise<Schedules_users_properties[]> => {
  const propertieRepository = AppDataSource.getRepository(Properties);
  const schedulesRepository = AppDataSource.getRepository(
    Schedules_users_properties
  );

  const property = await propertieRepository.findOneBy({
    id: propertyIdRequest,
  });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  const schedules = await schedulesRepository.find({
    relations: {
      property: true,
      user: true,
    },
  });

  return schedules;
};
