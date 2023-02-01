import { Moniter } from "../models/MoniterM";
import { AsignSystem } from "../models/AsignSystem_M";

import { Request, Response } from "express";

export class MoniterController {
  /* ---------------------------------------------------------------------------------Add addMoniter API-------------------------------------------------------------------------------------- */
  public async addMoniter(req: Request, res: Response) {
    try {
      //check if user already exists or not
      let moniter = await Moniter.findOne({ ModelNo: req.body.ModelNo });
      if (moniter)
        return res
          .status(400)
          .json({ Message: "This Moniter is already Added" });

      let newMoniter = new Moniter({
        MoniterName: req.body.MoniterName,
        ModelNo: req.body.ModelNo,
        CreatedBy: req.body.CreatedBy,
      });

      newMoniter.save((err, moniter) => {
        if (err) {
          res.status(403).send(err);
        }
        res.status(200).send(moniter);
      });
    } catch (error) {
      console.log(error);
    }
  }

  /* ---------------------------------------------------------------------------------Update Moniter API-------------------------------------------------------------------------------------- */
  public async updateMoniter(req: Request, res: Response) {
    try {
      let moniter = await Moniter.findOne({ ModelNo: req.body.ModelNo });
      if (moniter)
        return res
          .status(400)
          .json({ Message: "This Moniter is already Added" });

      const {
        MoniterName,
        ModelNo,
        CreatedBy,
      }: /* CreatedBy, */
      { MoniterName: string; ModelNo: string; CreatedBy: string } = req.body;

      const Update_Moniter = await Moniter.findByIdAndUpdate(
        { _id: req.params.moniterId },
        {
          $set: {
            MoniterName: MoniterName,
            ModelNo: ModelNo,
            CreatedBy: CreatedBy,
          },
        },
        { new: true }
      );

      if (!Update_Moniter) {
        res.status(401).send({
          Message: "Moniter Update Faild!",
          status: "Error",
          success: false,
          statusCode: 401,
        });
      } else {
        res.status(200).send({
          Message: "Moniter Updated Successfully",
          status: "Sucess",
          statusCode: 200,
          success: true,
          data: Update_Moniter,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  /* ---------------------------------------------------------------------------------Delete Moniter API-------------------------------------------------------------------------------------- */
  public async deleteMoniter(req: Request, res: Response) {
    try {
      //check if moniter is asigned or not
      /* const asignsystem = await AsignSystem.find({ _id: req.params.moniterId });
      if (asignsystem) {
        res.status(401).send("Cant Delete Moniter Because Moniter is Assigned");
      } */

      const del_Moniter = await Moniter.deleteOne({
        _id: req.params.moniterId,
      });

      if (!del_Moniter) {
        res.status(401).send({
          Message: "Moniter Delete Faild!",
          status: "Error",
          success: false,
          statusCode: 401,
        });
      } else {
        res.status(200).send({
          Message: "Moniter Deleted Successfully",
          status: "Sucess",
          statusCode: 200,
          success: true,
          data: del_Moniter,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  /* ---------------------------------------------------------------------------------View Moniter API-------------------------------------------------------------------------------------- */
  public async viewMoniter(req: Request, res: Response) {
    try {
      const view_user = await Moniter.find().sort({ createdAt: -1 });
      res.status(200).json({
        Message: "View Moniter Data",
        data: view_user,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
}
