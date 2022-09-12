"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function userGuildChecking(req) {
    try {
        const { id } = req.params;
        const user = req.user;
        const guild = user.guilds;
        const guildFilter = guild.filter((g) => g.id === id);
        if (guildFilter.length && guildFilter[0].mutual && guildFilter[0].manageGuild)
            return true;
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
exports.default = userGuildChecking;
