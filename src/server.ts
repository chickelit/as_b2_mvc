require("dotenv").config();

import path from "path";
import express from "express";
import cors from "cors";
import hbs from "hbs";
import { router } from "./routes";
import { dataSource } from "./database/data-source";
import { viewRouter } from "./routes/views";
import multer from "multer";

const app = express();
const port = +process.env.PORT!;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));

hbs.registerHelper("json", function (context) {
  return JSON.stringify(context);
});

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));

app.use("/", viewRouter);
app.use("/api", router);

app.listen(port, async () => {
  try {
    await dataSource.initialize();

    console.log(`App listening on port: ${port}`);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
});
