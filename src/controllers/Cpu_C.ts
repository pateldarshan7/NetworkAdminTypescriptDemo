import { Cpu } from "../models/CpuM";
import { AsignSystem } from "../models/AsignSystem_M";
import { Request, Response } from "express";

export class CpuController {
  /* ---------------------------------------------------------------------------------Add addCpu API-------------------------------------------------------------------------------------- */
  public async addCpu(req: Request, res: Response) {
    try {
      //check if user already exists or not
      let cpudetail = await Cpu.findOne({ ModelNo: req.body.ModelNo });
      if (cpudetail)
        return res.status(400).json({ Message: "This Cpu is already Added" });

      let newCpu = new Cpu({
        CpuName: req.body.CpuName,
        ModelNo: req.body.ModelNo,
        Processor: req.body.Processor,
        CreatedBy: req.body.CreatedBy,
      });

      newCpu.save((err, cpudetail) => {
        if (err) {
          res.status(403).send(err);
        }
        res.status(200).json(cpudetail);
      });
    } catch (error) {
      console.log(error);
    }
  }
  /* ---------------------------------------------------------------------------------Update Cpu API-------------------------------------------------------------------------------------- */
  public async updateCpu(req: Request, res: Response) {
    try {
      //check if Cpu already exists or not
      const {
        CpuName,
        ModelNo,
        Processor,
        CreatedBy,
      }: /* CreatedBy, */
      {
        CpuName: string;
        ModelNo: string;
        Processor: string;
        CreatedBy: string;
      } = req.body;

      let cpudetail = await Cpu.findOne({
        _id: { $ne: req.params.cpuId },
        ModelNo: req.body.ModelNo,
      });
      if (cpudetail)
        return res.status(400).json({ Message: "This Cpu is already Added" });

      const Update_Cpu = await Cpu.findByIdAndUpdate(
        { _id: req.params.cpuId },
        {
          $set: {
            CpuName: CpuName,
            ModelNo: ModelNo,
            Processor: Processor,
            CreatedBy: CreatedBy,
          },
        },
        { new: true }
      );

      if (!Update_Cpu) {
        res.status(401).send({
          Message: "Cpu Update Faild!",
          status: "Error",
          success: false,
          statusCode: 401,
        });
      } else {
        res.status(200).send({
          Message: "Cpu Updated Successfully",
          status: "Sucess",
          statusCode: 200,
          success: true,
          data: Update_Cpu,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  /* ---------------------------------------------------------------------------------Delete Cpu API-------------------------------------------------------------------------------------- */
  public async deleteCpu(req: Request, res: Response) {
    try {
      //check if cpu is asigned or not
      /*    const asignsystem = await AsignSystem.find({ _id: req.params.cpuId });
      if (asignsystem) {
        res.status(401).send("Cant Delete Cpu Because Cpu is Assigned");
      } */

      const del_Cpu = await Cpu.deleteOne({
        _id: req.params.cpuId,
      });

      if (!del_Cpu) {
        res.status(401).send({
          Message: "Cpu Delete Faild!",
          status: "Error",
          success: false,
          statusCode: 401,
        });
      } else {
        res.status(200).send({
          Message: "Cpu Deleted Successfully",
          status: "Sucess",
          statusCode: 200,
          success: true,
          data: del_Cpu,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  /* ---------------------------------------------------------------------------------View Cpu API-------------------------------------------------------------------------------------- */
  public async viewCpu(req: Request, res: Response) {
    try {
      const view_user = await Cpu.find().sort({ createdAt: -1 });
      res.status(200).json({
        Message: "View CPU Data",
        data: view_user,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
}
