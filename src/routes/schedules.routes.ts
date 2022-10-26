import {
  createScheduleController,
  listAllSchedulesFromPropertyController,
} from "./../controllers/schedules.controller";
import { Router } from "express";

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const routeSchedules = Router();

//ROTA PARA AGENDAR UMA VISITA
routeSchedules.post("", ensureAuthMiddleware, createScheduleController);
//ROTA DE LISTAGEM DE TODOS OS AGENDAMENTOS DE UM IMÓVEL
routeSchedules.get(
  "/properties/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listAllSchedulesFromPropertyController
);

export default routeSchedules;
