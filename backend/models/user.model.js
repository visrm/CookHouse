import mongoose from "mongoose";

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
      communities: [
        {
          community: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community",
          },
          role: {
            type: String,
            enum: ["member", "admin", "owner"],
            default: "member",
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
    likedRecipes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        default: [],
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
