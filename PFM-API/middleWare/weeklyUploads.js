const cron = require("node-cron");
const User = require("./../models/userModel");
const Cost = require("./../models/costModel");

exports.checkAndAddFixedCosts = async (req, res) => {
  try {
    // Get the user by ID
    const user = await User.findById(req.params.id);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const { fixedCosts, references } = user;

    // Get the current date
    const currentDate = new Date();

    // Filter fixed costs based on the day of the month
    const recentFixedCosts = fixedCosts.filter((cost) => {
      // Use the cost.date as the day of the month for the current month
      const costDayOfMonth = cost.date;

      console.log(costDayOfMonth);

      // Set the costDate to the specified day of the month for the current month
      const costDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - (currentDate.getDate() - costDayOfMonth)
      );

      // Check if the costDate is within the last 7 days
      const daysDifference = Math.floor(
        (currentDate - costDate) / (1000 * 60 * 60 * 24)
      );

      console.log("Cost Date:", costDate);
      console.log("Days Difference:", daysDifference);

      return daysDifference >= 0 && daysDifference < 7;
    });

    // Add recent fixed costs to the Cost collection and update user references
    const newCosts = await Cost.insertMany(
      recentFixedCosts.map((cost) => {
        const newCostDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - (currentDate.getDate() - cost.date)
        );

        console.log("New Cost Date:", newCostDate);

        return {
          user_id: user._id,
          amount: cost.amount,
          category: cost.category,
          // Use the cost.date as the day of the month for the current month
          date: newCostDate,
          description: cost.description,
        };
      })
    );

    // Update user references with the new cost IDs
    references.costs = references.costs.concat(
      newCosts.map((cost) => cost._id)
    );

    // Save the updated user
    await user.save();

    console.log("Fixed costs checked and added successfully");
  } catch (err) {}
};

cron.schedule("30 19 * * 3", async () => {
  try {
    // Get all existing users
    const users = await User.find();

    // Loop through each user and run the checkAndAddFixedCosts function
    for (const user of users) {
      await exports.checkAndAddFixedCosts({ params: { id: user._id } }, null);
    }

    console.log("Weekly task completed successfully.");
  } catch (err) {
    console.error("Weekly task failed:", err);
  }
});

// exports.test = async () => {
//   try {
//     console.log("running");
//     // Get all existing users
//     const users = await User.find();

//     // Loop through each user and run the checkAndAddFixedCosts function
//     for (const user of users) {
//       await exports.checkAndAddFixedCosts({ params: { id: user._id } }, null);
//     }

//     console.log("Weekly task completed successfully.");
//   } catch (err) {
//     console.error("Weekly task failed:", err);
//   }
// };
