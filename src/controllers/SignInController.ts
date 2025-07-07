import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorParser } from "Src/helpers/ErrorParser";
import { UserService } from "Src/services/UserService";
import z from "zod";

export class SignInController {
  public static async create(request: Request, response: Response) {
    const { data: body, error } = z
      .object({
        email: z.string().email({ message: "Este email é inválido." }),
        password: z.string().min(1, { message: "É necessário enviar a senha." }),
      })
      .safeParse(request.body);

    if (error) return response.render("sign-in", { layout: "_layout", errors: ErrorParser.zodToApi(error), form: request.body });

    const user = await UserService.findByEmail(body.email);

    if (!user || !bcrypt.compareSync(body.password, user.password))
      return response.render("sign-in", { layout: "_layout", errors: [{ message: "Credenciais inválidas" }], form: request.body });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30d",
      }
    );

    response.cookie("authorization", `Bearer ${token}`).redirect("/");
  }
}
