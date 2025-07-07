import { User } from "../src/database/entities/User.entity";
import "express-session";

declare module "express-serve-static-core" {
  interface Request {
    flash(type: string, message?: string): string[] | void;
  }
}

declare module "express-session" {
  interface SessionData {
    flash?: Record<string, string[]>;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
