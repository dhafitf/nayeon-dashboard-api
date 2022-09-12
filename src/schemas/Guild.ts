import mongoose, { Schema } from "mongoose";
import { GuildType } from "../types/guilds";

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

const ServerSchema = new Schema<GuildType>(
  {
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
    channels: mongoose.Schema.Types.Mixed,
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
  },
  { versionKey: false }
);

export default mongoose.model("Server", ServerSchema);
