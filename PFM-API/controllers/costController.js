const Cost = require("../models/costModel");
const User = require("../models/userModel");
const moment = require("moment");

// Controller to get all costs for a user
exports.getAllCosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate("references.costs");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const costs = user.references.costs;
    res.status(200).json(costs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to create a new cost and associate it with a user
exports.createNewCost = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming request body contains necessary information for the new cost
    const { description, amount, category } = req.body;

    const newCost = new Cost({
      user_id: userId,
      description,
      amount,
      category,
    });

    const savedCost = await newCost.save();

    // Add the reference to the new cost in the user's references.costs array
    user.references.costs.push(savedCost._id);
    await user.save();

    res.status(201).json(savedCost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to get all costs for a specific month for a user
exports.getMonthCosts = async (req, res) => {
  const userId = req.params.id;
  const index = parseInt(req.params.index, 10);

  try {
    const user = await User.findById(userId).populate("references.costs");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentMonth = moment().subtract(index, "months");
    const startOfMonth = currentMonth.startOf("month").toISOString();
    const endOfMonth = currentMonth.endOf("month").toISOString();

    const costsForMonth = user.references.costs.filter((cost) => {
      const costDate = moment(cost.date);
      return costDate.isBetween(startOfMonth, endOfMonth, null, "[]");
    });

    res.status(200).json(costsForMonth);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCost = async (req, res) => {
  const userId = req.params.id;
  const costId = req.params.costId;

  try {
    const user = await User.findById(userId).populate("references.costs");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cost = user.references.costs.find(
      (cost) => cost._id.toString() === costId
    );

    if (!cost) {
      return res.status(404).json({ message: "Cost not found" });
    }

    res.status(200).json(cost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateCost = async (req, res) => {
  const costId = req.params.costId;

  console.log(req.body);

  try {
    const cost = await Cost.findByIdAndUpdate(costId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        cost,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to delete a specific cost for a user
exports.deleteCost = async (req, res) => {
  const userId = req.params.id;
  const costId = req.params.costId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove cost reference from the user's references.costs array
    user.references.costs = user.references.costs.filter(
      (cost) => cost.toString() !== costId
    );

    // Delete the actual cost entry
    await Cost.findByIdAndDelete(costId);

    await user.save();
    res.status(204).json(); // No content on successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
