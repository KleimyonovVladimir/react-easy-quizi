import Router, { NextFunction, Request, Response } from "express";
import passport from "passport";

const router = Router();

const checkPassport = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) return next(error); // It is null
    if (!user) return res.status(401).send(info.message);
    return res.status(200).send(user);
  })(req, res, next);
};

// Login with passport. Access token will be added to the cookies
router.post("/login", passport.authenticate("local"), async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/logout", async (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
  });

  res.sendStatus(200);
});

export default router;
