import { Request, Response } from "express";
import loginService from "../services/login.services";

import { ILogin } from "./../interfaces/login/login.interfaces";

const loginController = async (req: Request, res: Response) => {
  const loginData: ILogin = req.body;
  const token = await loginService(loginData);
  return res.status(200).json({ token });
};

export default loginController;
