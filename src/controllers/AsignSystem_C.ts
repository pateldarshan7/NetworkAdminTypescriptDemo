import { AsignSystem } from "../models/AsignSystem_M";
import { Request, Response } from "express";

//created class named AsignSystemController
export class AsignSystemController {
  /* ---------------------------------------------------------------------------------Add AsignSystem API-------------------------------------------------------------------------------------- */
  public async addassignSystem(req: Request, res: Response) {
    try {
      //check if AsignSystem already exists or not
      let AsignSys = await AsignSystem.findOne({
        MoniterId: req.body.MoniterId,
        CpuId: req.body.CpuId,
        MouseId: req.body.MouseId,
        AssignToUserId: req.body.AssignToUserId,
      });
      if (AsignSys)
        return res
          .status(400)
          .json({ Message: "This PC is already Assigned to user" });

      let newAsignSys = new AsignSystem({
        MoniterId: req.body.MoniterId,
        CpuId: req.body.CpuId,
        MouseId: req.body.MouseId,
        AssignToUserId: req.body.AssignToUserId,
      });

      newAsignSys.save((err, AsignSys) => {
        if (err) {
          res.status(403).send(err);
        }
        res.status(200).json(AsignSys);
      });
    } catch (error) {
      res.status(403).send(error);
    }
  }
  /* ---------------------------------------------------------------------------------Update AsignSystem API-------------------------------------------------------------------------------------- */
  public async updateassignSystem(req: Request, res: Response) {
    try {
      //check if AsignSystem already exists or not
      let asignSystemdetail = await AsignSystem.findOne({
        MoniterId: req.body.MoniterId,
        CpuId: req.body.CpuId,
        MouseId: req.body.MouseId,
        AssignToUserId: req.body.AssignToUserId,
      });
      if (asignSystemdetail)
        return res
          .status(400)
          .json({ Message: "This System is already Added" });

      const {
        MoniterId,
        CpuId,
        MouseId,
        AssignToUserId,
      }: {
        MoniterId: string;
        CpuId: string;
        MouseId: string;
        AssignToUserId: string;
      } = req.body;

      const Update_AsignSystem = await AsignSystem.findByIdAndUpdate(
        { _id: req.params.assignsystemId },
        {
          $set: {
            MoniterId: MoniterId,
            CpuId: CpuId,
            MouseId: MouseId,
            AssignToUserId: AssignToUserId,
          },
        },
        { new: true }
      );

      if (!Update_AsignSystem) {
        res.status(401).send({
          Message: "System Update Faild!",
          status: "Error",
          success: false,
          statusCode: 401,
        });
      } else {
        res.status(200).send({
          Message: "System Updated Successfully",
          status: "Sucess",
          statusCode: 200,
          success: true,
          data: Update_AsignSystem,
        });
      }
    } catch (error) {
      res.status(403).send(error);
    }
  }
  /* ---------------------------------------------------------------------------------Delete AsignSystem API-------------------------------------------------------------------------------------- */
  public async deleteaddassignSystem(req: Request, res: Response) {
    try {
      const del_asignSystem = await AsignSystem.deleteOne({
        _id: req.params.assignsystemId,
      });

      if (!del_asignSystem) {
        res.status(401).send({
          Message: "AsignSystem Delete Faild!",
          status: "Error",
          success: false,
          statusCode: 401,
        });
      } else {
        res.status(200).send({
          Message: "AsignSystem Deleted Successfully",
          status: "Sucess",
          statusCode: 200,
          success: true,
          data: del_asignSystem,
        });
      }
    } catch (error) {
      res.status(403).send(error);
    }
  }
  /* ---------------------------------------------------------------------------------View AsignSystem API-------------------------------------------------------------------------------------- */
  /* public async viewassignSystem(req: Request, res: Response) {
    try {
      const view_user = await AsignSystem.find().sort({ createdAt: -1 });
      res.status(200).json({
        Message: "View AsignSystem Data",
        data: view_user,
      });
    } catch (error) {
      console.log(error);
    }
  } */

  public async viewassignSystem(req: Request, res: Response) {
    try {
      const view_asignsystemdetails = await AsignSystem.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "AssignToUserId",
            foreignField: "_id",
            as: "Users",
          },
        },
        {
          $lookup: {
            from: "moniters",

            localField: "MoniterId",
            foreignField: "_id",
            as: "Moniters",
          },
        },

        {
          $lookup: {
            from: "cpus",
            localField: "CpuId",
            foreignField: "_id",
            as: "CPU",
          },
        },

        {
          $lookup: {
            from: "mice",
            localField: "MouseId",
            foreignField: "_id",
            as: "Mouse",
          },
        },
        {
          $project: {
            user: { $arrayElemAt: ["$Users", 2] },
            moniter: { $arrayElemAt: ["$Moniters", 0] },
            cpu: { $arrayElemAt: ["$CPU", 0] },
            mouse: { $arrayElemAt: ["$Mouse", 0] },
          },
        },
      ]);

      res.status(200).json({
        Message: "View AsignSystem Data",
        data: view_asignsystemdetails,
      });
    } catch (error) {
      res.status(403).send(error);
    }
  } /*


























  

  /* ------------------------------------------------------------------------------singleviewassignSystem--------------------- ---------------------------------------------------------------- */
  /*public async singleviewassignSystem(req: Request, res: Response) {
    try {
      const view_asignsystemdetails = await AsignSystem.aggregate([
        {
          $lookup: {
            from: "moniters",
            localField: "MoniterId",
            foreignField: "_id",
            as: "Moniters",
          },
        },
        {
          $unwind: "$Moniters",
        },

        {
          $lookup: {
            from: "cpus",
            localField: "CpuId",
            foreignField: "_id",
            as: "CPU",
          },
        },
        {
          $unwind: "$CPU",
        },
        {
          $lookup: {
            from: "mice",
            localField: "MouseId",
            foreignField: "_id",
            as: "Mouse",
          },
        },
        {
          $unwind: "$Mouse",
        },
      ]);
      console.log(view_asignsystemdetails);
      res.status(200).json({
        Message: "View AsignSystem Data",
        data: view_asignsystemdetails,
      });
    } catch (error) {
      console.log(error);
    }
  }
 */
  /* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
}
