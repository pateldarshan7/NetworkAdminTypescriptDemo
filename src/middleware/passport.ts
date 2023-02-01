import { User } from "../models/UserM";
import { JWT_KEY } from "../config/db";
import passportJwt from "passport-jwt";
import { PassportStatic } from "passport";
import { Request } from "express";

const { Strategy } = passportJwt;

// for http only cookie system

const cookieExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies?.jwt;
  }

  return jwt;
};
const optionsCookie = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_KEY,
};
export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(optionsCookie, async (payload, done) => {
      await User.findById(payload.userId)
        .then((user) => {
          user ? done(null, user) : done(null, false);
        })
        .catch(() => done(null, false));
    })
  );
};
