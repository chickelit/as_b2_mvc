import { Router } from "express";
import { requireAuth } from "Src/middleware/requireAuth";

export const viewRouter = Router();

viewRouter.get("/sign-up", (req, res) => res.render("sign-up", { layout: "_layout" }));
viewRouter.get("/sign-in", (req, res) => res.render("sign-in", { layout: "_layout" }));
viewRouter.get("/dashboard/products", requireAuth({ returnTo: "/sign-in" }), (req, res) =>
  res.render("dashboard/products", { layout: "_layout" })
);
viewRouter.get("/dashboard/products/create", requireAuth({ returnTo: "/sign-in" }), (req, res) =>
  res.render("dashboard/products/create", { layout: "_layout" })
);
viewRouter.get("/dashboard/products/create", requireAuth({ returnTo: "/sign-in" }), (req, res) =>
  res.render("dashboard/products/create", { layout: "_layout" })
);
viewRouter.get("/", requireAuth({ returnTo: "/sign-in" }), (req, res) => res.render("home", { layout: "_layout", user: req.user }));
