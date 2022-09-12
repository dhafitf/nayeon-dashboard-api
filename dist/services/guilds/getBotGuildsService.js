"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const DISCORD_API_URL = "https://discord.com/api/v9";
function getBotGuildsService() {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios_1.default.get(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${TOKEN}` },
    });
}
exports.default = getBotGuildsService;
