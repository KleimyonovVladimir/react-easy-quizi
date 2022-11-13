import Router from "express";
import passport from "passport";

const router = Router();

// Login with passport. Access token will be added to the cookies
router.post("/login", passport.authenticate("local"), async (req, res) => {
  try {
    // Return status 200 and user back to the client
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
