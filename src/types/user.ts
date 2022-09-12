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

export type PartialUser = {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  banner: null;
  banner_color: null;
  accent_color: null;
  email: string;
};
