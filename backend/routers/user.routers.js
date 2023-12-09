import { Router } from "express";

import {
  addWork,
  getTodaysWork,
  login,
  register,
  logout,
} from "../controllers/user.controllers.js";

import isLoggedIn from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/send-work", isLoggedIn, addWork);
router.get("/today-work", isLoggedIn, getTodaysWork);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;
