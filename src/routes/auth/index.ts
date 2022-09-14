import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/discord", passport.authenticate("discord"), (req, res) => {
  res.send(200);
});

router.get("/discord/redirect", passport.authenticate("discord"), (req, res) => {
  return res.redirect("https://bot.oncetwice.one/");
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return next(err);
    }
  });
  res.clearCookie("nayeon.sid").redirect("https://bot.oncetwice.one");
});

router.get("/status", (req, res) => {
  return req.user ? res.sendStatus(200) : res.sendStatus(401);
});

router.post("/cookie", (req, res) => {
  const randomNumber = Math.random().toString();
  res.cookie("nayeon.sid", randomNumber, {
    maxAge: 900000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  console.log("cookie created successfully");

  return res.sendStatus(200);
});

export default router;
