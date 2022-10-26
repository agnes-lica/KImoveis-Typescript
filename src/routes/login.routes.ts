import { Router } from "express";
import loginController from "../controllers/login.controller";

const routeLogin = Router();

//ROTA DE LOGIN
routeLogin.post("", loginController);

export default routeLogin;
