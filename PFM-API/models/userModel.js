const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  primaryColor: { type: String },
  secondaryColor: { type: String },
  accentColor: { type: String },
});

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
      added: { type: Boolean },
    },
  ],
  fixedCosts: [
    {
      amount: { type: Number },
      category: { type: String },
      description: { type: String },
      date: { type: Number },
      added: { type: Boolean },
    },
  ],
  categories: { type: [String] },
  colorSchema: { type: colorSchema }, // Nested color schema object
});

const User = mongoose.model("User", userSchema);

module.exports = User;
