import axios from "axios";

const DISCORD_API_URL = "https://discord.com/api/v9";

export default function fetchDiscordBot(endpoint: string) {
  try {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios
      .get(`${DISCORD_API_URL}${endpoint}`, {
        headers: { Authorization: `Bot ${TOKEN}` },
      })
      .then((res) => res.data);
  } catch (error) {
    console.log(error);
    return false;
  }
}
