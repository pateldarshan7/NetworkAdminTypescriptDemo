import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IUser {
  UserName: string;
  Password: string;
  City: string;
  Is_Admin: boolean;
  IsUserVarified: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    UserName: {
      type: String,
      trim: true,
      required: true,
      maxlength: 20,
    },

    Password: {
      type: String,
      required: true,
    },
    Is_Admin: {
      type: Boolean,
      default: false,
    },
    IsUserVarified: {
      type: Boolean,
      default: false,
    },

    City: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export { User };
