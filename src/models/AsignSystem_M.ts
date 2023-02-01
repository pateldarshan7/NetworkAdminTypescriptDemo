import * as mongoose from "mongoose";

const Schema = mongoose.Schema;


/* --------------------------------------------------------------------AsignSystemSchema----------------------------------------------------------------------------------------------------- */
 interface IAsignSystem {
  MoniterId: any;
  CpuId: any;
  MouseId: any;
  AssignToUserId: any;
}

const AsignSystemSchema  = new Schema<IAsignSystem>({

    MoniterId: 
    {
       type: Schema.Types.ObjectId,
       ref: "Moniter",

    },

    CpuId: 
    {
        type: Schema.Types.ObjectId,
        ref: "Cpu",
    },
    MouseId: 
    {
         type: Schema.Types.ObjectId,
         ref: "Mouse",

    },
    AssignToUserId: 
    {
         type: Schema.Types.ObjectId,
         ref: "User",

    },

    //user to asignd to the userid 
},{timestamps: true});


const AsignSystem = mongoose.model("AsignSystem", AsignSystemSchema);

export {
AsignSystem
}
