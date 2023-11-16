import mongoose, { Schema, model, Model } from "mongoose";
enum ECategory {
  Perishable = "perishable",
  CashCrop = "cashcrop",
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
      lowercase: true,
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
    images: { type: String, required: [true, "Please provide images"] },
    reviews: {
      type: [
        {
          message: String,
          rating: {
            type: Number,
            required: [true, "Please rate the product"],
            min: 0,
            max: 5,
          },
        },
      ],
      ref: "Reviews",
    },
    delivery_duration: {
      type: Number, //Numbers of days
      required: [true, "Please provide your delivery duration"],
      default: 0,
    },
    verified_product: {
      type: Boolean,
      default: false,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: [true, "A product must have a owner"],
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

productSchema.pre("save", async function (next) {
  if (this.category === ECategory.Perishable) {
    this.delivery_duration = Math.min(this.delivery_duration, 2);
  }
  next();
});

export default model("Product", productSchema);
