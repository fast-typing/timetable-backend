import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    teacher:
    {
      type: Boolean
    }

  }
);

export default mongoose.model("User", UserSchema);
