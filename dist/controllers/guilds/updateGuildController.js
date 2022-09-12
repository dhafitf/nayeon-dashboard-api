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
const utils_1 = require("../../utils");
const Guild_1 = __importDefault(require("../../schemas/Guild"));
function updateGuildController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const validation = (0, utils_1.userGuildChecking)(req);
            if (!validation)
                return res.status(401).send({ status: "Forbidden" });
            const getChannel = (yield (0, utils_1.fetchDiscordBot)(`/guilds/${id}/channels`));
            const getGuildData = (yield (0, utils_1.fetchDiscordBot)(`/guilds/${id}?with_counts=true`));
            const channels = getChannel.map((channel) => {
                return {
                    id: channel.id,
                    name: channel.name,
                    type: channel.type,
                    position: channel.position,
                    parentID: channel.parentId || null,
                };
            });
            const roles = getGuildData.roles.map((role) => {
                var _a;
                return {
                    id: role.id,
                    name: role.name,
                    color: role.color,
                    permissions: Number(role.permissions),
                    position: role.position,
                    managed: role.managed,
                    hoist: role.hoist,
                    isBot: ((_a = role.tags) === null || _a === void 0 ? void 0 : _a.bot_id) ? true : false,
                };
            });
            const { name, description, icon, approximate_member_count, owner_id, features } = getGuildData;
            const data = {
                name,
                description,
                icon: icon ? `https://cdn.discordapp.com/icons/${id}/${icon}` : null,
                ownerID: owner_id,
                features,
                memberCount: approximate_member_count,
                channels,
                roles,
            };
            const exixtingData = yield Guild_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
            if (exixtingData)
                return res.status(200).send({ status: "Updated" });
            const notifSettingsInit = {
                channel: {
                    id: null,
                    name: null,
                    type: null,
                },
                role: {
                    id: null,
                    name: null,
                },
            };
            const newData = Object.assign(Object.assign({ _id: getGuildData.id }, data), { settings: {
                    language: "en",
                    prefix: ";",
                }, notificationSettings: {
                    bubble: notifSettingsInit,
                    vlive: notifSettingsInit,
                    instagram: notifSettingsInit,
                    youtube: notifSettingsInit,
                    tiktok: notifSettingsInit,
                    random: notifSettingsInit,
                }, embed_messages: null, autoResponser: [], in: true });
            const newGuild = new Guild_1.default(newData);
            yield newGuild.save();
            return res.status(200).send({ status: "Created" });
        }
        catch (error) {
            console.log(error);
            return res.status(400).send({ status: "Error" });
        }
    });
}
exports.default = updateGuildController;
