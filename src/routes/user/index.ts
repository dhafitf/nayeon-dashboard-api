import { Router } from "express";
import { isAuthenticated } from "../../utils/middlewares";
import getUserController from "../../controllers/user/getUserController";

const router = Router();

router.get("/", isAuthenticated, getUserController);

export default router;
