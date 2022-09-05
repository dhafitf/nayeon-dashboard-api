import { Request, Response } from "express";
import { UserType } from "../../types/user";

export default async function getGuildsController(req: Request, res: Response) {
  try {
    const user = req.user as UserType;
    const guilds = user.guilds;
    return res.send(guilds);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: "Error" });
  }
}
