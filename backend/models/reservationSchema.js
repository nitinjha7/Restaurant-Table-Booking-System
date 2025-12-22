import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First name must be greater than 3 characters"],
      maxLength: [30, "First name must not exceed 30 characters"],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [3, "Last name must be greater than 3 characters"],
      maxLength: [30, "Last name must not exceed 30 characters"],
    },
    email: {
      type: String,
      require: true,
      validate: [validator.isEmail, "Provide a valid email address"],
    },
    phone: {
      type: String,
      required: true,
      minLength: [10, "Phone number must contain only 10 digits"],
      maxLength: [10, "Phone number must contain only 10 digits"],
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.model("reservation", reservationSchema);
