import axios from "axios";
import { PartialUser } from "../../types/user";

const DISCORD_API_URL = "https://discord.com/api/v9";

export default async function getUserService(accessToken: string) {
  return axios.get<PartialUser>(`${DISCORD_API_URL}/users/@me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
