import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "Src/database/entities/User.entity";
import { UserService } from "Src/services/UserService";
import { Cookie } from "../helpers/Cookie";

export const requireAuth = ({ returnTo }: { returnTo?: string } = {}) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const handleUnauthorized = () => {
      if (returnTo) return response.redirect(returnTo);

      response.status(401).json({
        message: "Acesso não autorizado",
      });
    };

    const cookies = request.headers.cookie;

    if (!cookies) return handleUnauthorized();

    const authorization = Cookie.get(cookies, "authorization");

    if (!authorization) return handleUnauthorized();

    const token = authorization?.split(" ")[1];

    if (!token) return handleUnauthorized();

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as Pick<User, "id">;
    const user = await UserService.findById(payload.id);

    if (!user) return handleUnauthorized();

    request.user = user;

    next();
  };
};
