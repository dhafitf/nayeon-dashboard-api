import { PartialGuilds } from "../types/guilds";
import { UserType } from "../types/user";
import { Request } from "express";

export default function userGuildChecking(req: Request) {
  try {
    const { id } = req.params;
    const user = req.user as UserType;
    const guild = user.guilds;

    const guildFilter = guild.filter((g: PartialGuilds) => g.id === id);
    if (guildFilter.length && guildFilter[0].mutual && guildFilter[0].manageGuild) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
