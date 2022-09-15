import { Request, Response } from "express";
import { UserType } from "../../types/user";
import User from "../../schemas/User";
import { getMutualGuildsService, getUserGuildsService } from "../../services/guilds";

export default async function getGuildsController(req: Request, res: Response) {
  try {
    const userData = req.user as UserType;
    const { update } = req.query;

    if (Boolean(update)) {
      const { accessToken } = userData.user;

      const { data: getUserGuilds } = await getUserGuildsService(accessToken);
      const getGuilds = await getMutualGuildsService(getUserGuilds);

      const exixtingData = await User.findOneAndUpdate({ "user.id": userData.user.id }, { guilds: getGuilds }, { new: true });
      if (!exixtingData) return res.sendStatus(404);

      return res.send(exixtingData.guilds);
    } else {
      const guilds = userData.guilds;
      return res.send(guilds);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: "Error" });
  }
}
