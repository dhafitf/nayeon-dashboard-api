"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_discord_1 = require("passport-discord");
const User_1 = __importDefault(require("../schemas/User"));
const guilds_1 = require("../services/guilds");
const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URL } = process.env;
passport_1.default.serializeUser((user, done) => {
    return done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(id);
        return user ? done(null, user) : done(null, null);
    }
    catch (error) {
        console.log(error);
        return done(error, null);
    }
}));
passport_1.default.use(new passport_discord_1.Strategy({
    clientID: DISCORD_CLIENT_ID,
    clientSecret: DISCORD_CLIENT_SECRET,
    callbackURL: DISCORD_REDIRECT_URL,
    scope: ["identify", "email", "guilds"],
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, username, discriminator, avatar, email, guilds } = profile;
        const getGuilds = yield (0, guilds_1.getMutualGuildsService)(guilds);
        const data = {
            user: {
                id: id,
                username,
                discriminator,
                iconURL: avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}?size=2048` : `https://cdn.discordapp.com/embed/avatars/${Number(discriminator) % 5}.png`,
                email,
                accessToken,
                refreshToken,
            },
            guilds: getGuilds,
        };
        const existingUser = yield User_1.default.findOneAndUpdate({ "user.id": id }, data, { new: true });
        if (existingUser)
            return done(null, existingUser);
        const newUser = new User_1.default(data);
        const savedUser = yield newUser.save();
        return done(null, savedUser);
    }
    catch (error) {
        console.log(error);
        return done(error, undefined);
    }
})));
