import { AnyZodObject, ZodError } from "zod";
import { ServerError } from "./error";
import { Request, Response, NextFunction, RequestHandler } from "express";

export function validate(schema: AnyZodObject): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!schema) return next();

    const { body, params, query } = req;

    try {
      schema.parse({ ...body, ...params, ...query });
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(422).json({
          code: ServerError,
          message: err.errors,
        });
      }
      next(err);
    }
  };
}
