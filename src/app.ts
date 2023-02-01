import express from "express";
import { Routes } from "./routes/routes";
import mongoose from "mongoose";
import { DB, PORT } from "./config/db";
import cookieParser from "cookie-parser";
import passport from "passport";
import myPassport from "./middleware/passport";

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);

    this.connect();
    this.app.listen();
  }

  private config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(passport.initialize());
    myPassport(passport);
  }
  private connect = async () => {
    try {
      await mongoose.connect(DB);
      console.log("MongoDB Connected Successfully");

      this.app.listen(PORT, () => {
        console.log(`Listening On PORT ${PORT}`);
      });
    } catch (error) {
      console.log("Error connecting to MongoDB", error);
    }
  };
}

export default new App().app;
