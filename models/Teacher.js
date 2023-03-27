import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  holidays: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("Teacher", TeacherSchema);
