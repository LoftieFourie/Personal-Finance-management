const Investment = require("../models/investmentModel");
const User = require("../models/userModel");
const moment = require("moment");

// Controller to get all investments for a user
exports.getAllInvestments = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate("references.investments");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const investments = user.references.investments;
    res.status(200).json(investments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to create a new investment and associate it with a user
exports.createNewInvestment = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming request body contains necessary information for the new investment
    const { name, amount, description } = req.body;

    const newInvestment = new Investment({
      user_id: userId,
      name,
      amount,
      description,
    });

    const savedInvestment = await newInvestment.save();

    // Add the reference to the new investment in the user's references.investments array
    user.references.investments.push(savedInvestment._id);
    await user.save();

    res.status(201).json(savedInvestment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getMonthInvestments = async (req, res) => {
  const userId = req.params.id;
  const index = parseInt(req.params.index, 10);

  try {
    const user = await User.findById(userId).populate("references.investments");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentMonth = moment().subtract(index, "months");
    const startOfMonth = currentMonth.startOf("month").toISOString();
    const endOfMonth = currentMonth.endOf("month").toISOString();

    const investmentsForMonth = user.references.investments.filter(
      (investment) => {
        const investmentDate = moment(investment.date);
        return investmentDate.isBetween(startOfMonth, endOfMonth, null, "[]");
      }
    );

    res.status(200).json(investmentsForMonth);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getInvestment = async (req, res) => {
  const userId = req.params.id;
  const investmentId = req.params.investmentId;

  try {
    const user = await User.findById(userId).populate("references.investments");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const investment = user.references.investments.find(
      (investment) => investment._id.toString() === investmentId
    );

    if (!investment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    res.status(200).json(investment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to update a specific investment for a user
exports.updateInvestment = async (req, res) => {
  const userId = req.params.id;
  const investmentId = req.params.investmentId;

  try {
    const user = await User.findById(userId).populate("references.investments");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const investmentIndex = user.references.investments.findIndex(
      (investment) => investment._id.toString() === investmentId
    );

    if (investmentIndex === -1) {
      return res.status(404).json({ message: "Investment not found" });
    }

    // Update investment fields based on the request body
    Object.assign(user.references.investments[investmentIndex], req.body);

    await user.save();
    res.status(200).json(user.references.investments[investmentIndex]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to delete a specific investment for a user
exports.deleteInvestment = async (req, res) => {
  const userId = req.params.id;
  const investmentId = req.params.investmentId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove investment reference from the user's references.investments array
    user.references.investments = user.references.investments.filter(
      (investment) => investment.toString() !== investmentId
    );

    // Delete the actual investment entry
    await Investment.findByIdAndDelete(investmentId);

    await user.save();
    res.status(204).json(); // No content on successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
