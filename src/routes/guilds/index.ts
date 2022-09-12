import { Router } from "express";
import { isAuthenticated } from "../../utils/middlewares";
import { getGuildsController, getGuildByIdController, updateGuildController } from "../../controllers/guilds";
import { updateSubsController, updateSettingsController } from "../../controllers/guilds/updateDatabaseController";

const router = Router();

router.get("/", isAuthenticated, getGuildsController);
router.get("/:id", isAuthenticated, getGuildByIdController);

router.put("/:id/update", isAuthenticated, updateGuildController);
router.put("/:id/settings", isAuthenticated, updateSettingsController);
router.put("/:id/subs", isAuthenticated, updateSubsController);

export default router;
