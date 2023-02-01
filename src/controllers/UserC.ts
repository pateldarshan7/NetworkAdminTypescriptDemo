import { User } from "../models/UserM";
import { AsignSystem } from "../models/AsignSystem_M";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/db";

export class UserController {
  // ==================== Add User ======================
  public async Signup_User(req: Request, res: Response) {
    const { UserName, Password, City } = req.body;
    try {
      //check if user already exists or not
      const existingusercheck = await User.findOne({ UserName });
      if (existingusercheck)
        return res
          .status(422)
          .json({ Message: "Username is already registred" });

      //Encrypt password securly using bycrpty
      const Encryptedpwd = await bcrypt.hash(Password, 10);

      //creating new user with Encrypted Password
      const newUser = new User({ UserName, Password: Encryptedpwd, City });
      await newUser.save();
      res.status(200).json({
        Message: "User Registered sucessfully",
        status: "Sucess",
        statusCode: 200,
        success: true,
        data: newUser,
      });
    } catch (error) {
      res.status(401).json({
        Message: "Registeration Faild!",
        status: "Error",
        success: false,
        statusCode: 401,
        Error: error,
      });
    }
  }

  // ==================== Login User ======================
  public async SignIn(req: Request, res: Response) {
    try {
      //check if user already exists or not
      const user: any = await User.findOne({ UserName: req.body.UserName });

      let newUser = new User({
        UserName: req.body.UserName,
        Password: req.body.Password,
      });

      //if (!user) return res.status(400).send("Invalid UserName");

      //cheking password using bycrpty
      const isValidPassword = await bcrypt.compare(
        newUser.Password,
        user.Password
      );

      if (!user && !isValidPassword)
        return res.status(401).send("Invalid UserName or Password!");

      const token = jwt.sign(
        {
          UserName: user.UserName,
          userId: user.id,
        },
        JWT_KEY,
        {
          expiresIn: "7d",
        }
      );
      if (!token) {
        res.status(401).json({
          Message:
            "You are not Authorised User Please Login to accsess this website",
        });
      }
      //cookie strore token in cookie
      res.cookie("jwt", token);

      res.status(200).json({
        UserName: user.UserName,
        Message: "User Logged in Successfully",
        token,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // ==================== Update User ======================
  public async update_User(req: Request, res: Response) {
    const {
      UserName,
      Password,
      City,
    }: { UserName: string; Password: string; City: string } = req.body;
    try {
      const EncyptedPassword = await bcrypt.hash(Password, 10);

      const Update_User = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        {
          $set: {
            UserName: UserName,
            Password: EncyptedPassword,
            City: City,
          },
        },
        { new: true }
      );
      if (!Update_User) {
        res.status(401).send({
          Message: "User Update Faild!",
          status: "Error",
          success: false,
          statusCode: 401,
        });
      } else {
        res.status(200).send({
          Message: "User Updated Successfully",
          status: "Sucess",
          statusCode: 200,
          success: true,
          data: Update_User,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // ==================== Delete User ======================

  public async delete_user(req: Request, res: Response) {
    try {
      //check user is assign in system
      /*   const asignsystem = await AsignSystem.find({ _id: req.params.userId });
      if (asignsystem) {
        res.status(401).send("Cant Delete User Because User is Assigned");
      } */

      const del_User = await User.deleteOne({ _id: req.params.userId });

      if (!del_User) {
        res.status(401).send({
          Message: "User Delete Faild!",
          status: "Error",
          success: false,
          statusCode: 401,
        });
      } else {
        res.status(200).send({
          Message: "User Deleted Successfully",
          status: "Sucess",
          statusCode: 200,
          success: true,
          data: del_User,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // ==================== Home Page User ======================
  public async home(req: Request, res: Response) {
    try {
      res.status(200).send({
        Message: "Welcome to the Developers zone",
      });
    } catch (error) {
      console.log(error);
    }
  }
  // ==================== view User ======================
  public async getUser(req: Request, res: Response) {
    try {
      const view_user = await User.find().sort({ createdAt: -1 });
      res.status(200).json({
        Message: "View User Data",
        data: view_user,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // ==================== view single User Data======================
  public async single_user_view(req: Request, res: Response) {
    try {
      const view_sin_cont = await User.findById(req.params.userId);
      res.status(200).json({
        Message: "View Single User Data",
        data: view_sin_cont,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
}
