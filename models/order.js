const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      product: {
        type: Object,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: Object,
      required: true,
      ref: "User",
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
