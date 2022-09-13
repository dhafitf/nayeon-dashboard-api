require("dotenv").config();
require("./strategies/discord");

import express from "express";
import routes from "./routes";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import store from "connect-mongo";
import { dbConnect } from "./utils/dbConnect";

const app = express();
const PORT = process.env.PORT || 3005;

const main = async () => {
  try {
    const { MONGOURI, SECRET } = process.env;
    await dbConnect().then(() => console.log("Connected to mongodb"));

    app.use(express.json());
    app.use(express.urlencoded());

    app.use(
      cors({
        origin: ["https://bot.oncetwice.one/", "https://oncetwice.one/", "https://nayeon-bot-dashboard.vercel.app/"],
        credentials: true,
      })
    );

    app.use(
      session({
        secret: `${SECRET}`,
        name: "nayeon.sid",
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 60000 * 60 * 24 * 7,
          httpOnly: true,
        },
        store: store.create({
          mongoUrl: MONGOURI,
        }),
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/", routes);
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

main();
