import { Router } from "express";
import { DashboardProductController } from "Src/controllers/DashboardController";
import { ProductController } from "Src/controllers/ProductController";
import { requireAuth } from "Src/middleware/requireAuth";

export const viewRouter = Router();

viewRouter.get("/sign-up", (req, res) => res.render("sign-up", { layout: "_layout" }));
viewRouter.get("/sign-in", (req, res) => res.render("sign-in", { layout: "_layout" }));
viewRouter.get("/", ProductController.index);
viewRouter.get("/show/:id", ProductController.show);
viewRouter.get("/dashboard/products", requireAuth({ returnTo: "/sign-in" }), DashboardProductController.index);
viewRouter.get("/dashboard/products/show/:id", requireAuth({ returnTo: "/sign-in" }), DashboardProductController.show);
viewRouter.get("/dashboard/products/create", requireAuth({ returnTo: "/sign-in" }), (req, res) =>
  res.render("dashboard/products/create", { layout: "_layout" })
);
viewRouter.get("/dashboard/products/edit/:id", requireAuth({ returnTo: "/sign-in" }), DashboardProductController.update);
