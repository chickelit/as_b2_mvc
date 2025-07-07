import { z } from "zod";

export class ErrorParser {
  public static zodToApi(error: z.ZodError) {
    return error.errors.map((ze) => {
      return {
        isValidationError: true,
        path: ze.path[0],
        message: ze.message,
      };
    });
  }
}
