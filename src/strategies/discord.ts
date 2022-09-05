import passport from "passport";
import { Strategy, Profile } from "passport-discord";
import { VerifyCallback } from "passport-oauth2";
import User from "../schemas/User";
import { getMutualGuildsService } from "../services/guilds";

const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URL } = process.env;

passport.serializeUser((user: any, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    return user ? done(null, user) : done(null, null);
  } catch (error) {
    console.log(error);
    return done(error, null);
  }
});

passport.use(
  new Strategy(
    {
      clientID: DISCORD_CLIENT_ID!,
      clientSecret: DISCORD_CLIENT_SECRET!,
      callbackURL: DISCORD_REDIRECT_URL,
      scope: ["identify", "email", "guilds"],
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      try {
        const { id, username, discriminator, avatar, email, guilds }: any = profile;
        const getGuilds = await getMutualGuildsService(guilds);

        const data = {
          user: {
            id: id,
            username,
            discriminator,
            iconURL: `https://cdn.discordapp.com/avatars/${id}/${avatar}?size=2048`,
            email,
            accessToken,
            refreshToken,
          },
          guilds: getGuilds,
        };

        const existingUser = await User.findOneAndUpdate({ "user.id": id }, data, { new: true });
        if (existingUser) return done(null, existingUser);

        const newUser = new User(data);
        const savedUser = await newUser.save();
        return done(null, savedUser);
      } catch (error) {
        console.log(error);
        return done(error as any, undefined);
      }
    }
  )
);
