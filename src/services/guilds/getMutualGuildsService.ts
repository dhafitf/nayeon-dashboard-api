import { getBotGuildsService } from ".";
import { PartialGuilds } from "../../types/guilds";

export default async function getMutualGuildsService(userGuilds: PartialGuilds[]) {
  const { data: botGuilds } = await getBotGuildsService();

  const filterByPermission = (item: PartialGuilds) => {
    if ((parseInt(item.permissions) & 0x20) === 0x20) return (item.manageGuild = true);
    return (item.manageGuild = false);
  };

  const adminUserGuilds = userGuilds.filter(filterByPermission);

  const mutualGuilds = adminUserGuilds.map((guild) => {
    if (Boolean(botGuilds.some((botGuild) => botGuild.id === guild.id))) {
      return { ...guild, mutual: true };
    } else {
      return { ...guild, mutual: false };
    }
  });

  return mutualGuilds;
}
