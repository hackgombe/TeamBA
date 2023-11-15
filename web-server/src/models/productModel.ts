import mongoose, { Schema, model, Model } from "mongoose";
enum ECategory {
  Perishable = "Perishable",
  CashCrop = "CashCrop",
}
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your product Name"],
    },
    description: {
      type: String,
      required: [true, "Please provide a discription"],
    },
    price: {
      type: Number,
      required: [true, "Please provide your prices"],
      min: 0,
    },
    category: {
      type: String,
      enum: Object.values(ECategory),
      required: [true, "Provide the category"],
    },
    stockQuantity: {
      type: Number,
      required: [true, "Please provide the stock quality"],
      min: 0,
    },
    stockUnits: {
      type: String,
      lowercase: true,
      require: [true, "Please provide the stock units"],
    },
    imageUrl: { type: String, required: [true, "Please provide images"] },
    reviews: {
      type: [
        {
          message: String,
        },
      ],
      ref: "Reviews",
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

export default model("Product", productSchema);
