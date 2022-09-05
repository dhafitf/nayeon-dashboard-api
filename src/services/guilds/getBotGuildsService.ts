import axios from "axios";
import { PartialGuilds } from "../../types/guilds";

const DISCORD_API_URL = "https://discord.com/api/v9";

export default function getBotGuildsService() {
  const TOKEN = process.env.DISCORD_BOT_TOKEN;
  return axios.get<PartialGuilds[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
    headers: { Authorization: `Bot ${TOKEN}` },
  });
}
