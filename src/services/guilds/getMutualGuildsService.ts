import { getBotGuildsService } from ".";
import { PartialGuilds } from "../../types/guilds";

export default async function getMutualGuildsService(userGuilds: PartialGuilds[]) {
  const { data: botGuilds } = await getBotGuildsService();

  const adminUserGuilds = userGuilds.filter(({ permissions }) => (parseInt(permissions) & 0x20) === 0x20);
  const mutualGuilds = adminUserGuilds.map((guild) => {
    if (Boolean(botGuilds.some((botGuild) => botGuild.id === guild.id))) {
      return { ...guild, mutual: true };
    } else {
      return { ...guild, mutual: false };
    }
  });

  return mutualGuilds;
}
