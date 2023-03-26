import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import {
  registerValidation,
  loginValidation,
  timetableCreateValidation
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as TimetableController from "./controllers/TimetableController.js";
import * as UserController from "./controllers/UserController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import cors from "cors";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.ghsbmhm.mongodb.net/timetable?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Ok"))
  .catch((err) => console.log("db error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

app.use(express.json());
app.use(cors());
app.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post("/uploads", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.get("/me", checkAuth, UserController.getMe);
app.patch("/user/:id", checkAuth, UserController.update);
app.get("/user/:id", checkAuth, UserController.getOne);

app.get("/", TimetableController.getAll);
app.get("/:id", TimetableController.getOne);
app.post(
  "/",
  checkAuth,
  timetableCreateValidation,
  handleValidationErrors,
  TimetableController.create
);

app.use("/uploads", express.static("uploads"));
app.delete("/timetable/:id", checkAuth, TimetableController.remove);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server Ok");
});
