import { Request, Response } from "express";
import User from "../../schemas/User";
import getUserService from "../../services/user/getUserService";
import { UserType } from "../../types/user";

export default async function getUserController(req: Request, res: Response) {
  try {
    const userData = req.user as UserType;
    const { accessToken, refreshToken } = userData.user;
    const { data: getUser } = await getUserService(accessToken);

    const { id, username, discriminator, avatar, email } = getUser;

    const data = {
      id,
      username,
      discriminator,
      iconURL: avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}?size=2048` : `https://cdn.discordapp.com/embed/avatars/${Number(discriminator) % 5}.png`,
      email,
      accessToken,
      refreshToken,
    };

    const existingUser = await User.findOneAndUpdate({ "user.id": userData.user.id }, { user: data }, { new: true });
    return res.send(existingUser);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: "Error" });
  }
}
