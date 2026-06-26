import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ["superadmin", "admin"],
      default: "admin",
    },
    ministryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ministry",
      default: null,
    },
    profession: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
