import { Router } from "express";
import { SignInController } from "Src/controllers/SignInController";
import { SignUpController } from "Src/controllers/SignUpController";

export const router = Router();

router.post("/sign-up", SignUpController.create);
router.post("/sign-in", SignInController.create);
