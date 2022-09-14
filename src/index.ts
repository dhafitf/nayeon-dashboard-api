require("dotenv").config();
require("./strategies/discord");

import express from "express";
import routes from "./routes";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import store from "connect-mongo";
import { dbConnect } from "./utils/dbConnect";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3005;

const main = async () => {
  try {
    const { MONGOURI, SECRET } = process.env;
    await dbConnect().then(() => console.log("Connected to mongodb"));

    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cookieParser());

    app.set("trust proxy", 1);
    app.use(
      cors({
        origin: ["https://bot.oncetwice.one", "https://oncetwice.one", "https://nayeon-dashboard-api.vercel.app"],
        credentials: true,
      })
    );

    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Origin", "https://bot.oncetwice.one");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "ACL, BIND, CHECKOUT, CONNECT, COPY, DELETE, GET, HEAD, LINK, LOCK, M-SEARCH, MERGE, MKACTIVITY, MKCALENDAR, MKCOL, MOVE, NOTIFY, OPTIONS, PATCH, POST, PROPFIND, PROPPATCH, PURGE, PUT, REBIND, REPORT, SEARCH, SOURCE, SUBSCRIBE, TRACE, UNBIND, UNLINK, UNLOCK, UNSUBSCRIBE"
      );
      res.setHeader("Access-Control-Allow-Headers", "Authorization, User-Agent, Content-Type");
      next();
    });

    app.use(
      session({
        secret: `${SECRET}`,
        name: "nayeon.sid",
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 60000 * 60 * 24 * 7,
          httpOnly: true,
          domain: ".oncetwice.one",
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
