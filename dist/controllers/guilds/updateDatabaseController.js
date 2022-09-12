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
exports.updateSubsController = exports.updateSettingsController = void 0;
const Guild_1 = __importDefault(require("../../schemas/Guild"));
function updateSettingsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { language, prefix } = req.body;
            yield Guild_1.default.findOneAndUpdate({ _id: id }, { "settings.language": language, "settings.prefix": prefix }, { new: true });
            return res.status(200).send({ status: "Updated" });
        }
        catch (error) {
            console.log(error);
            return res.status(400).send({ status: "Error" });
        }
    });
}
exports.updateSettingsController = updateSettingsController;
function updateSubsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { type, channel, role } = req.body;
            const data = { channel, role };
            switch (type) {
                case "bubble":
                    yield Guild_1.default.findOneAndUpdate({ _id: id }, { "notificationSettings.bubble": data }, { new: true });
                    break;
                case "vlive":
                    yield Guild_1.default.findOneAndUpdate({ _id: id }, { "notificationSettings.vlive": data }, { new: true });
                    break;
                case "instagram":
                    yield Guild_1.default.findOneAndUpdate({ _id: id }, { "notificationSettings.instagram": data }, { new: true });
                    break;
                case "youtube":
                    yield Guild_1.default.findOneAndUpdate({ _id: id }, { "notificationSettings.youtube": data }, { new: true });
                    break;
                case "tiktok":
                    yield Guild_1.default.findOneAndUpdate({ _id: id }, { "notificationSettings.tiktok": data }, { new: true });
                    break;
                default:
                    return res.status(400).send({ status: "Error" });
            }
            return res.status(200).send({ status: "Updated" });
        }
        catch (error) {
            console.log(error);
            return res.status(400).send({ status: "Error" });
        }
    });
}
exports.updateSubsController = updateSubsController;
