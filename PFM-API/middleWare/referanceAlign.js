const User = require("./../models/userModel");
const Cost = require("./../models/costModel");

exports.syncCostReferences = async () => {
  try {
    // Find all costs
    const allCosts = await Cost.find();

    // Iterate through each cost
    for (const cost of allCosts) {
      const userId = cost.user_id;

      // Find the user by user_id
      const user = await User.findById(userId);

      if (user) {
        const costId = cost._id;

        // Check if costId is in user's references.costs array
        if (!user.references.costs.includes(costId)) {
          // If not, add it
          user.references.costs.push(costId);
          await user.save();
          console.log(
            `Added cost ${costId} to user ${userId}'s references.costs`
          );
        }
      } else {
        console.log(`User ${userId} not found for cost ${cost._id}`);
      }
    }

    console.log("Sync completed successfully");
  } catch (error) {
    console.error("Error syncing cost references:", error);
  }
};
