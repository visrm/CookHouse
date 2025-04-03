import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: { type: Number },
    profile: {
      profileImg: {
        type: String,
        default: "",
      },
      coverImg: {
        type: String,
        default: "",
      },
      bio: {
        type: String,
        default: "",
      },
      diet_preference: {
        type: String,
        default: "",
      },
      location: {
        type: String,
        default: "",
      },
      communities: [{
        community: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Community",
          default: [],
        },
        community_role: {
          type: String,
          enum : ["community_member", "community_admin"],
          default: "community_member",
        },
       },
      ],
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
