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
require("dotenv").config();
require("./strategies/discord");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const dbConnect_1 = require("./utils/dbConnect");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3005;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { MONGOURI, SECRET } = process.env;
        yield (0, dbConnect_1.dbConnect)().then(() => console.log("Connected to mongodb"));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded());
        app.use((0, cookie_parser_1.default)());
        app.set("trust proxy", 1);
        app.use((0, cors_1.default)({
            origin: ["https://bot.oncetwice.one", "https://oncetwice.one", "https://nayeon-dashboard-api.vercel.app"],
            credentials: true,
        }));
        app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Origin", "https://bot.oncetwice.one");
            res.setHeader("Access-Control-Allow-Methods", "ACL, BIND, CHECKOUT, CONNECT, COPY, DELETE, GET, HEAD, LINK, LOCK, M-SEARCH, MERGE, MKACTIVITY, MKCALENDAR, MKCOL, MOVE, NOTIFY, OPTIONS, PATCH, POST, PROPFIND, PROPPATCH, PURGE, PUT, REBIND, REPORT, SEARCH, SOURCE, SUBSCRIBE, TRACE, UNBIND, UNLINK, UNLOCK, UNSUBSCRIBE");
            res.setHeader("Access-Control-Allow-Headers", "Authorization, User-Agent, Content-Type");
            next();
        });
        app.use((0, express_session_1.default)({
            secret: `${SECRET}`,
            name: "nayeon.sid",
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60000 * 60 * 24 * 7,
                httpOnly: true,
                domain: ".oncetwice.one",
            },
            store: connect_mongo_1.default.create({
                mongoUrl: MONGOURI,
            }),
        }));
        app.use(passport_1.default.initialize());
        app.use(passport_1.default.session());
        app.use("/", routes_1.default);
        app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
});
main();
