import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ErrorParser } from "Src/helpers/ErrorParser";
import { UserService } from "Src/services/UserService";
import z from "zod";

export class SignUpController {
  public static async create(request: Request, response: Response) {
    const { data: body, error } = z
      .object({
        name: z.string().min(2, { message: "O nome está muito curto." }),
        email: z.string().email({ message: "Este email é inválido." }),
        password: z.string().min(6, { message: "A senha está muito curta." }),
      })
      .safeParse(request.body);

    if (error) return response.render("sign-up", { layout: "_layout", errors: ErrorParser.zodToApi(error), form: request.body });

    const isEmailInUse = await UserService.exists({ email: body.email });

    if (isEmailInUse) {
      return response.render("sign-up", {
        layout: "_layout",
        errors: [
          {
            isValidationError: true,
            path: "email",
            message: "Este email já está em uso.",
          },
        ],
        form: request.body,
      });
    }

    body.password = bcrypt.hashSync(body.password, 10);

    const user = await UserService.create(body);
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
