import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
    // Add fields for ratings and reviews
    ratings: [
      {
        user: {
          type: mongoose.ObjectId,
          ref: "Users",
        },
        value: {
          type: Number,
          required: true,
        },
      },
    ],
    reviews: [
      {
        user: {
          type: mongoose.ObjectId,
          ref: "Users",
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
    // Add a user field to associate a user with the product
    user: {
      type: mongoose.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
