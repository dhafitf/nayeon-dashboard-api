import axios from "axios";
import { PartialGuilds } from "../../types/guilds";

const DISCORD_API_URL = "https://discord.com/api/v9";

export default async function getUserGuildsService(accessToken: string) {
  return axios.get<PartialGuilds[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
