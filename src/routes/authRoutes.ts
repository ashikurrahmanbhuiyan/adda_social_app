import { Router } from "express";
import { getLogin, getRegister, postRegister, postLogin, getDashboard, logout } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { redirectIfAuthenticated } from "../middlewares/redirectIfAuthenticated";

const router = Router();

router.get("/login",redirectIfAuthenticated, getLogin);
router.post("/login", postLogin);
router.get("/register", redirectIfAuthenticated, getRegister);
router.post("/register", postRegister);
router.get("/dashboard", authMiddleware, getDashboard);
router.get("/logout", logout);

export default router;
