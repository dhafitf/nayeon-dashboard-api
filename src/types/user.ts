import { PartialGuilds } from "./guilds";

export type UserType = {
  id: string;
  user: {
    id: string;
    username: string;
    discriminator: string;
    iconURL: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  };
  guilds: PartialGuilds[];
};
