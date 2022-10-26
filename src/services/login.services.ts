import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import AppDataSource from "../data-source";
import AppError from "../erros/appError";
import { ILogin } from "./../interfaces/login/login.interfaces";
import { User } from "../entities/user.entity";

const loginService = async ({ email, password }: ILogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("Invalid user or password!", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid user or password!", 403);
  }
  const token = jwt.sign(
    {
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY as string,
    { expiresIn: "2h", subject: user.id }
  );

  return token;
};

export default loginService;
