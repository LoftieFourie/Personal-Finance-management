const express = require("express");
const costControllers = require("./../controllers/costController.js");

const router = express.Router();

router
  .route("/:id")
  .get(costControllers.getAllCosts)
  .post(costControllers.createNewCost);

router.route("/month/:id/:index").get(costControllers.getMonthCosts);

router
  .route("/:id/:costId")
  .get(costControllers.getCost)
  .delete(costControllers.deleteCost)
  .patch(costControllers.updateCost);

module.exports = router;
