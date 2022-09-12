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
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
function putGuildController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validation = (0, utils_1.userGuildChecking)(req);
            console.log(validation);
            // =====
            // const { id } = req.params;
            // const user = req.user as UserType;
            // const guild = user.guilds;
            // // const isValid = user.guilds.some((guild: PartialGuilds) => guild.id === id);
            // const guildFilter = guild.filter((r: PartialGuilds) => r.id === id);
            // if (guildFilter.length && guildFilter[0].mutual && guildFilter[0].manageGuild) {
            //   return res.send({ body: req.body });
            // }
            // ==== diatasi oleh const validation
            // if (id === )
            // console.log(cek);
            return res.status(401).send({ msg: "Forbidden" });
        }
        catch (error) {
            console.log(error);
            return res.status(400).send({ msg: "Error" });
        }
    });
}
exports.default = putGuildController;
