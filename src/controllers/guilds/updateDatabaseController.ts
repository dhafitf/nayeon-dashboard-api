import { Request, Response } from "express";
import Server from "../../schemas/Guild";

export async function updateSettingsController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { language, prefix } = req.body;

    await Server.findOneAndUpdate({ _id: id }, { "settings.language": language, "settings.prefix": prefix }, { new: true });
    return res.status(200).send({ status: "Updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: "Error" });
  }
}

export async function updateSubsController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { type, channel, role } = req.body;

    const data = { channel, role };

    switch (type) {
      case "bubble":
        await Server.findOneAndUpdate({ _id: id }, { "notificationSettings.bubble": data }, { new: true });
        break;
      case "vlive":
        await Server.findOneAndUpdate({ _id: id }, { "notificationSettings.vlive": data }, { new: true });
        break;
      case "instagram":
        await Server.findOneAndUpdate({ _id: id }, { "notificationSettings.instagram": data }, { new: true });
        break;
      case "youtube":
        await Server.findOneAndUpdate({ _id: id }, { "notificationSettings.youtube": data }, { new: true });
        break;
      case "tiktok":
        await Server.findOneAndUpdate({ _id: id }, { "notificationSettings.tiktok": data }, { new: true });
        break;
      default:
        return res.status(400).send({ status: "Error" });
    }

    return res.status(200).send({ status: "Updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: "Error" });
  }
}
