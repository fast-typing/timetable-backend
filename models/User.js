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

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
