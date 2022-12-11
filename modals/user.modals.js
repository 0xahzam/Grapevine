import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    id: {
      type: String,
    },
    username: {
      type: String,
    },
    count: { type: Number },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

export default { User };
