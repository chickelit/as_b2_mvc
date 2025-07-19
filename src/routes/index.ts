import { Router } from "express";
import { DashboardProductController } from "Src/controllers/DashboardController";
import { SignInController } from "Src/controllers/SignInController";
import { SignUpController } from "Src/controllers/SignUpController";
import { requireAuth } from "Src/middleware/requireAuth";

export const router = Router();

router.post("/sign-up", SignUpController.create);
router.post("/sign-in", SignInController.create);
router.post("/dashboard/products/create", requireAuth({ returnTo: "/sign-in" }), DashboardProductController.store);
router.put("/dashboard/products/edit/:id", requireAuth({ returnTo: "/sign-in" }), DashboardProductController.update);
