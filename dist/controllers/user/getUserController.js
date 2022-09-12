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
const getUserService_1 = __importDefault(require("../../services/user/getUserService"));
function getUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = req.user;
            const { accessToken, refreshToken } = userData.user;
            const { data: getUser } = yield (0, getUserService_1.default)(accessToken);
            const { id, username, discriminator, avatar, email } = getUser;
            const data = {
                id,
                username,
                discriminator,
                iconURL: avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}?size=2048` : `https://cdn.discordapp.com/embed/avatars/${Number(discriminator) % 5}.png`,
                email,
                accessToken,
                refreshToken,
            };
            const existingUser = yield User_1.default.findOneAndUpdate({ "user.id": userData.user.id }, { user: data }, { new: true });
            return res.send(existingUser);
        }
        catch (error) {
            console.log(error);
            return res.status(400).send({ msg: "Error" });
        }
    });
}
exports.default = getUserController;
