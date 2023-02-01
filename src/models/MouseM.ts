
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
/* ----------------------------------------------------------------------MouseSchema--------------------------------------------------------------------------------------------- */
interface IMouse {
  MouseName: string;
  ModelNo: string;
  CreatedBy:any;
}
 const MouseSchema = new Schema<IMouse>({

    MouseName: 
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
    CreatedBy: {
      type: Schema.Types.ObjectId,
    },
    
},{timestamps: true});
const Mouse = mongoose.model("Mouse", MouseSchema);

export {
Mouse
}