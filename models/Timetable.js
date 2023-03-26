import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    groups: [
      {
        group: {
          type: String,
          required: true,
        },
        lessons: [
          {
            title: {
              type: String,
              required: true,
            },
            teacher: {
              type: String,
              required: true,
            },
            cabinet: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Timetable", TimetableSchema);
