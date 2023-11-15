import mongoose, { Schema, model, Model } from "mongoose";

const sellerSchema = new Schema(
  {
    address: {
      type: String,
      required: [true, "Please provide your store address"],
    },
    products: {
      type: [Schema.Types.ObjectId],
      ref: "Products",
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: [true, "Each Token must be associated to a user"],
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

sellerSchema.virtual("number_of_sales").get(function () {
  return this.products.length;
});

export default model("Seller", sellerSchema);
