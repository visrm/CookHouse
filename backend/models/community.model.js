import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    Comn_name: {
      type: String,
      required: true,
      unique: true,
      maxLength: 30,
    },
    Comn_description: {
      type: String,
      required: true,
      default: "",
    },
    Comn_owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Comn_members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    Comn_posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
  },
  { timestamps: true }
);
