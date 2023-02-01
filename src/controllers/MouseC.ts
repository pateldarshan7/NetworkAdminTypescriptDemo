import { Mouse } from "../models/MouseM";
import { AsignSystem } from "../models/AsignSystem_M";

import { Request, Response } from "express";

export class MouseController {
  /* ---------------------------------------------------------------------------------Add Devices API-------------------------------------------------------------------------------------- */
  public async addMouse(req: Request, res: Response) {
    try {
      //check if user already exists or not
      let mousedetail = await Mouse.findOne({ ModelNo: req.body.ModelNo });
      if (mousedetail)
        return res.status(400).json({ Message: "This Mouse is already Added" });

      let newMouse = new Mouse({
        MouseName: req.body.MouseName,
        ModelNo: req.body.ModelNo,
        CreatedBy: req.body.CreatedBy,
      });

      newMouse.save((err, mousedetail) => {
        if (err) {
          res.status(403).send(err);
        }
        res.status(200).json(mousedetail);
      });
    } catch (error) {
      console.log(error);
    }
  }
  /* ---------------------------------------------------------------------------------Update Mouse API-------------------------------------------------------------------------------------- */
  public async updateMouse(req: Request, res: Response) {
    try {
      //check if Mouse already exists or not
      let mousedetail = await Mouse.findOne({ ModelNo: req.body.ModelNo });
      if (mousedetail)
        return res.status(400).json({ Message: "This Mouse is already Added" });

      const {
        MouseName,
        ModelNo,
        CreatedBy,
      }: /* CreatedBy, */
      {
        MouseName: string;
        ModelNo: string;
        CreatedBy: string;
      } = req.body;

      const Update_Mouse = await Mouse.findByIdAndUpdate(
        { _id: req.params.mouseId },
        {
          $set: {
            MouseName: MouseName,
            ModelNo: ModelNo,
            CreatedBy: CreatedBy,
          },
        },
        { new: true }
      );

      if (!Update_Mouse) {
        res.status(401).send({
          Message: "Mouse Update Faild!",
          status: "Error",
          success: false,
          statusCode: 401,
        });
      } else {
        res.status(200).send({
          Message: "Mouse Updated Successfully",
          status: "Sucess",
          statusCode: 200,
          success: true,
          data: Update_Mouse,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  /* ---------------------------------------------------------------------------------Delete Mouse API-------------------------------------------------------------------------------------- */
  public async deleteMouse(req: Request, res: Response) {
    try {
      //check if moniter is asigned or not
      /*  const asignsystem = await AsignSystem.find({ _id: req.params.mouseId });

      if (asignsystem) {
        res.status(401).send("Cant Delete Mouse Because Mouse is Assigned");
      } */
      const del_Mouse = await Mouse.deleteOne({
        _id: req.params.mouseId,
      });

      if (!del_Mouse) {
        res.status(401).send({
          Message: "Mouse Delete Faild!",
          status: "Error",
          success: false,
          statusCode: 401,
        });
      } else {
        res.status(200).send({
          Message: "Mouse Deleted Successfully",
          status: "Sucess",
          statusCode: 200,
          success: true,
          data: del_Mouse,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  /* ---------------------------------------------------------------------------------View Mouse API-------------------------------------------------------------------------------------- */
  public async viewMouse(req: Request, res: Response) {
    try {
      const view_user = await Mouse.find().sort({ createdAt: -1 });
      res.status(200).json({
        Message: "View Mouse Data",
        data: view_user,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
}
