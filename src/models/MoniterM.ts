import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
/* --------------------------------------------------------------------MoniterSchema----------------------------------------------------------------------------------------------------- */
 interface IMoniter {
  MoniterName: string;
  ModelNo: string;
  CreatedBy:any;
}
const MoniterSchema  = new Schema<IMoniter>({

    MoniterName: 
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
    },
    CreatedBy: {
      type: Schema.Types.ObjectId,
    },
    
}, { timestamps: true });

const Moniter = mongoose.model("Moniter", MoniterSchema);
export {
Moniter
}