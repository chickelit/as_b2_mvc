import { Router } from "express";
import multer from "multer";
import { DashboardProductController } from "Src/controllers/DashboardController";
import { SignInController } from "Src/controllers/SignInController";
import { SignUpController } from "Src/controllers/SignUpController";
import { requireAuth } from "Src/middleware/requireAuth";

export const router = Router();
const upload = multer();

router.post("/sign-up", SignUpController.create);
router.post("/sign-in", SignInController.create);
router.post("/dashboard/products/create", requireAuth({ returnTo: "/sign-in" }), upload.single("image"), DashboardProductController.store);
router.post(
  "/dashboard/products/edit/:id",
  requireAuth({ returnTo: "/sign-in" }),
  upload.single("image"),
  DashboardProductController.update
);
router.get(
  "/dashboard/products/delete/:id",
  requireAuth({ returnTo: "/sign-in" }),
  DashboardProductController.destroy
);
