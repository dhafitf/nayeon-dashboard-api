"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const reqString = {
    type: String,
    required: true,
};
const stringOrNull = {
    type: String || null,
    required: false,
};
const notifModels = {
    channel: {
        id: stringOrNull,
        name: stringOrNull,
        type: stringOrNull,
    },
    role: {
        id: stringOrNull,
        name: stringOrNull,
    },
};
const ServerSchema = new mongoose_1.Schema({
    _id: reqString,
    name: reqString,
    description: stringOrNull,
    icon: stringOrNull,
    features: [String],
    ownerID: reqString,
    settings: {
        language: reqString,
        prefix: reqString,
    },
    notificationSettings: {
        bubble: notifModels,
        vlive: notifModels,
        instagram: notifModels,
        youtube: notifModels,
        tiktok: notifModels,
        random: notifModels,
    },
    channels: mongoose_1.default.Schema.Types.Mixed,
    roles: [
        {
            id: reqString,
            name: String,
            color: Number,
            permissions: Number,
            position: Number,
            managed: Boolean,
            hoist: Boolean,
            isBot: Boolean,
        },
    ],
    embed_messages: [],
    autoResponder: [],
    memberCount: Number,
    in: Boolean,
}, { versionKey: false });
exports.default = mongoose_1.default.model("Server", ServerSchema);
