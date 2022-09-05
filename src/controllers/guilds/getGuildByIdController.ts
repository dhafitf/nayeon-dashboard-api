import { Request, Response } from "express";
import Server from "../../schemas/Guild";

export default async function getGuildByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const server = await Server.findById(id);

    if (server) return res.status(200).send(server);
    return res.status(404).send({
      msg: "Server not found",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: "Error" });
  }
}
