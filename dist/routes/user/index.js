"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../../utils/middlewares");
const getUserController_1 = __importDefault(require("../../controllers/user/getUserController"));
const router = (0, express_1.Router)();
router.get("/", middlewares_1.isAuthenticated, getUserController_1.default);
exports.default = router;
