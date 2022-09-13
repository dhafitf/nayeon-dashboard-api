"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get("/discord", passport_1.default.authenticate("discord"), (req, res) => {
    res.send(200);
});
router.get("/discord/redirect", passport_1.default.authenticate("discord"), (req, res) => {
    return res.redirect("https://bot.oncetwice.one/server");
});
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return next(err);
        }
    });
    res.clearCookie("nayeon.sid").redirect("https://bot.oncetwice.one");
});
router.get("/status", (req, res) => {
    return req.user ? res.sendStatus(200) : res.sendStatus(401);
});
exports.default = router;
