import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    category: {
      type: String,
      enum: [
        "breakfast",
        "lunch",
        "dinner",
        "appetiser",
        "soup",
        "salad",
        "main-course",
        "side-dish",
        "baked-good",
        "dessert",
        "snack",
        "meat",
        "sea-food",
        "drinks-beverages",
        "vegetarian",
        "miscellaneous",
      ],
      required: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    instructions: {
      type: String,
      required: true,
    },
    cuisine_type: {
      type: String,
      enum: [
        "american",
        "mediterranean",
        "chinese",
        "italian",
        "indian",
        "french",
        "mexican",
        "spanish",
        "japanese",
        "middle-eastern",
        "korean",
        "fusion",
        "haute",
        "religious",
        "other",
      ],
      required: true,
    },
    dietary_tags: [{ type: String, default: "" }],
    media_url: { type: String },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
