const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  references: {
    costs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cost" }],
    investments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Investment" }],
  },
  investmentTypes: [
    {
      amount: { type: Number },
      category: { type: String },
      description: { type: String },
    },
  ],
  fixedCosts: [
    {
      amount: { type: Number },
      category: { type: String },
      description: { type: String },
      date: { type: Number },
    },
  ],
  categories: { type: [String] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
