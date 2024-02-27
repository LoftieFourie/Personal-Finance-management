const cron = require("node-cron");
const User = require("./../models/userModel");
const Cost = require("./../models/costModel");

function isWithinLast7Days(date, currentDate) {
  const costDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    date
  );

  const daysDifference = Math.floor(
    (currentDate - costDate) / (1000 * 60 * 60 * 24)
  );

  return daysDifference >= 0 && daysDifference < 7;
}

// Middleware function
exports.checkAndAddFixedCostsMiddleware = async (req, res, next) => {
  try {
    // Get the user by ID
    const userId = req.userId;
    console.log("here is the middleware", req.userId);
    const user = await User.findById(userId);

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

    // Filter fixed costs based on the day of the month and added status
    const recentFixedCosts = fixedCosts.filter((cost) => {
      if (cost.added && !isWithinLast7Days(cost.date, currentDate)) {
        // If cost is already added but outside the last 7 days, set added to false
        cost.added = false;
        return true;
      }

      if (!cost.added && isWithinLast7Days(cost.date, currentDate)) {
        // If cost is not added and within the last 7 days, set added to true
        cost.added = true;
        return true;
      }

      return false;
    });

    // Add recent fixed costs to the Cost collection and update user references
    const newCosts = await Cost.insertMany(
      recentFixedCosts.map((cost) => {
        const newCostDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - (currentDate.getDate() - cost.date)
        );

        return {
          user_id: user._id,
          amount: cost.amount,
          category: cost.category,
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

    // Continue to the next middleware or route handler
  } catch (err) {
    console.error(err);
    // Handle errors appropriately
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// exports.checkAndAddFixedCosts = async (req, res) => {
//   try {
//     // Get the user by ID
//     const user = await User.findById(req.params.id);

//     if (!user) {
//       console.log("User not found");
//       return res.status(404).json({
//         status: "fail",
//         message: "User not found",
//       });
//     }

//     const { fixedCosts, references } = user;

//     // Get the current date
//     const currentDate = new Date();

//     // Filter fixed costs based on the day of the month
//     const recentFixedCosts = fixedCosts.filter((cost) => {
//       // Use the cost.date as the day of the month for the current month
//       const costDayOfMonth = cost.date;

//       console.log(costDayOfMonth);

//       // Set the costDate to the specified day of the month for the current month
//       const costDate = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth(),
//         currentDate.getDate() - (currentDate.getDate() - costDayOfMonth)
//       );

//       // Check if the costDate is within the last 7 days
//       const daysDifference = Math.floor(
//         (currentDate - costDate) / (1000 * 60 * 60 * 24)
//       );

//       console.log("Cost Date:", costDate);
//       console.log("Days Difference:", daysDifference);

//       return daysDifference >= 0 && daysDifference < 7;
//     });

//     // Add recent fixed costs to the Cost collection and update user references
//     const newCosts = await Cost.insertMany(
//       recentFixedCosts.map((cost) => {
//         const newCostDate = new Date(
//           currentDate.getFullYear(),
//           currentDate.getMonth(),
//           currentDate.getDate() - (currentDate.getDate() - cost.date)
//         );

//         console.log("New Cost Date:", newCostDate);

//         return {
//           user_id: user._id,
//           amount: cost.amount,
//           category: cost.category,
//           // Use the cost.date as the day of the month for the current month
//           date: newCostDate,
//           description: cost.description,
//         };
//       })
//     );

//     // Update user references with the new cost IDs
//     references.costs = references.costs.concat(
//       newCosts.map((cost) => cost._id)
//     );

//     // Save the updated user
//     await user.save();

//     console.log("Fixed costs checked and added successfully");
//   } catch (err) {}
// };

// cron.schedule(
//   "0 1 * * 3",
//   async () => {
//     try {
//       const users = await User.find();

//       for (const user of users) {
//         await exports.checkAndAddFixedCosts({ params: { id: user._id } }, null);
//       }

//       console.log("Weekly task completed successfully.");
//     } catch (err) {
//       console.error("Weekly task failed:", err);
//     }
//   },
//   {
//     timezone: "Africa/Johannesburg",
//   }
// );

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
