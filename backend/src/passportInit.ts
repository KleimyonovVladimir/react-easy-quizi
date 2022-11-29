import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { IUser, UserField } from "./models/user";

import { UserRepository } from "./repositories/user";
import { comparePassword } from "./utils/hashPassword";

const userRepository = new UserRepository();

passport.use(
  new LocalStrategy({ usernameField: UserField.Email }, async (email, password, done) => {
    // Checking is user with this email existing
    const user = await userRepository.getOne({ where: { email } });
    if (!user) return done(null, false, { message: "User does not exist" });

    // Checking password validation
    const passwordIsValid = await comparePassword(password, user.getDataValue(UserField.Password));
    if (!passwordIsValid) return done(null, false, { message: "Email or password is incorrect" });

    // Return user to the client
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, (user as IUser).uid);
});

passport.deserializeUser(async (uid: string, done) => {
  const user = await userRepository.getOne({ where: { uid } });

  done(null, user);
});

export { passport };
