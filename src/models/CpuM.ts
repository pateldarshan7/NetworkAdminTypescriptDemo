import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
/* -------------------------------------------------------------------------CpuSchema--------------------------------------------------------------------------------------------- */
interface ICpu {
  CpuName: string;
  ModelNo: string;
  Processor: string;
  CreatedBy:any;

}
 const CpuSchema = new Schema<ICpu>({

    CpuName: 
    {
        type: String,
        trim:true,
        required: true,
        maxlength: 20,

    },

    ModelNo: 
    {
        type: String,
        required: true,
        trim:true,
    },
    Processor: 
    {
        type: String,
        required: true,
        trim:true,
        maxlength: 20,

    },
    CreatedBy: {
      type: Schema.Types.ObjectId,
    },
    
 }, { timestamps: true });

const Cpu = mongoose.model("Cpu", CpuSchema);

export {
Cpu
}
