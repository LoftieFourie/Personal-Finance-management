const mongoose = require("mongoose");

const costSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: { type: Number, required: true },
  category: { type: String },
  date: { type: Date, default: Date.now },
  description: { type: String },
});

const Cost = mongoose.model("Cost", costSchema);

module.exports = Cost;
