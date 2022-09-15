"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../schemas/User"));
const guilds_1 = require("../../services/guilds");
function getGuildsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = req.user;
            const { update } = req.query;
            if (Boolean(update)) {
                const { accessToken } = userData.user;
                const { data: getUserGuilds } = yield (0, guilds_1.getUserGuildsService)(accessToken);
                const getGuilds = yield (0, guilds_1.getMutualGuildsService)(getUserGuilds);
                const exixtingData = yield User_1.default.findOneAndUpdate({ "user.id": userData.user.id }, { guilds: getGuilds }, { new: true });
                if (!exixtingData)
                    return res.sendStatus(404);
                return res.send(exixtingData.guilds);
            }
            else {
                const guilds = userData.guilds;
                return res.send(guilds);
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).send({ msg: "Error" });
        }
    });
}
exports.default = getGuildsController;
