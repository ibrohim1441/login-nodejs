import { Router } from "express";
import {
  GET,
  PUT,
  REGISTER,
  LOGIN,
  DELETE,
  POST,
} from "../controllers/users.js";
import { checkToken } from "../middlewares/checkToken.js";

export const userRouter = Router();


userRouter.post("/", checkToken, POST);

userRouter
  .get("/", GET)
  .get("/:id", GET)
  .post("/login", LOGIN)
  .post("/register", REGISTER)
  .put("/:id", PUT)
  .delete("/:id",DELETE);
