import {
  createScheduleService,
  listAllSchedulesFromPropertyService,
} from "../services/schedules.services";
import { Request, Response } from "express";
import { Schedules_users_properties } from "../entities/schedules_users_properties.entity";

//CRIAÇÃO DE AGENDAMENTO
export const createScheduleController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;
  const propertyId: string = req.body.propertyId;
  const date: Date = req.body.date;
  const hour: Date = req.body.hour;
  const createdSchedule = await createScheduleService(
    hour,
    date,
    propertyId,
    userId
  );
  return res
    .status(201)
    .json({ message: "Schedule created", schedule: createdSchedule });
};

//LISTAGEM DE TODOS OD AGENDAMENTOS DE UMA PROPRIEDADE
export const listAllSchedulesFromPropertyController = async (
  req: Request,
  res: Response
) => {
  const propertyId: string = req.params.id;
  const schedulesList = await listAllSchedulesFromPropertyService(propertyId);
  return res.json({ schedules: schedulesList });
};
