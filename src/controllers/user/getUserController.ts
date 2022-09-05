import { Request, Response } from "express";
import { UserType } from "../../types/user";

export default async function getUserController(req: Request, res: Response) {
  try {
    const user = req.user as UserType;
    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: "Error" });
  }
}
