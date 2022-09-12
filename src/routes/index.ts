import { Router } from "express";
import authRouter from "./auth";
import guildsRouter from "./guilds";
import userRouter from "./user";

const router = Router();

router.use("/auth", authRouter);
router.use("/guilds", guildsRouter);
router.use("/user", userRouter);

export default router;
