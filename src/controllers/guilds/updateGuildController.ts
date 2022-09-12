import { Request, Response } from "express";
import { PartialChannels, PartialRoles } from "../../types/guilds";
import { fetchDiscordBot, userGuildChecking } from "../../utils";
import Server from "../../schemas/Guild";

export default async function updateGuildController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const validation = userGuildChecking(req);
    if (!validation) return res.status(401).send({ status: "Forbidden" });

    const getChannel = (await fetchDiscordBot(`/guilds/${id}/channels`)) as any;
    const getGuildData = (await fetchDiscordBot(`/guilds/${id}?with_counts=true`)) as any;

    const channels = getChannel.map((channel: PartialChannels) => {
      return {
        id: channel.id,
        name: channel.name,
        type: channel.type,
        position: channel.position,
        parentID: channel.parentId || null,
      };
    });

    const roles = getGuildData.roles.map((role: PartialRoles) => {
      return {
        id: role.id,
        name: role.name,
        color: role.color,
        permissions: Number(role.permissions),
        position: role.position,
        managed: role.managed,
        hoist: role.hoist,
        isBot: role.tags?.bot_id ? true : false,
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

    const exixtingData = await Server.findOneAndUpdate({ _id: id }, data, { new: true });
    if (exixtingData) return res.status(200).send({ status: "Updated" });

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

    const newData = {
      _id: getGuildData.id,
      ...data,
      settings: {
        language: "en",
        prefix: ";",
      },
      notificationSettings: {
        bubble: notifSettingsInit,
        vlive: notifSettingsInit,
        instagram: notifSettingsInit,
        youtube: notifSettingsInit,
        tiktok: notifSettingsInit,
        random: notifSettingsInit,
      },
      embed_messages: null,
      autoResponser: [],
      in: true,
    };

    const newGuild = new Server(newData);
    await newGuild.save();

    return res.status(200).send({ status: "Created" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: "Error" });
  }
}
