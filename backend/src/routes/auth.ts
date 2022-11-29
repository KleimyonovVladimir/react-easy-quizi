import Router from "express";
import passport from "passport";

const router = Router();

// Login with passport. Access token will be added to the cookies
router.post("/login", async (req, res, next) => {
  try {
    passport.authenticate("local", (error, user, info) => {
      if (error) return next(error); // It is null
      if (!user) return res.status(403).send(info.message);
      res.status(200).send(user);
    })(req, res, next);
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
