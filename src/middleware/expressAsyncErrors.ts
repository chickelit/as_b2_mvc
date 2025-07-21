import { NextFunction, Request, Response } from "express";

export const express_async_errors_middleware = (error: Error, request: Request, response: Response, next: NextFunction) => {
  console.log("Express async errors");
  console.log(error);

  const statusCode = 500;
  const message = error.message;

  if (response.headersSent) return next(error);

  return response.status(statusCode).json({
    message,
  });
};
