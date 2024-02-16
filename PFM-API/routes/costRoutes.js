const express = require("express");
const costControllers = require("./../controllers/costController.js");
const { verifyToken } = require("./../middleWare/tokenVerification.js");

const router = express.Router();

router
  .route("/:id")
  .get(verifyToken, costControllers.getAllCosts)
  .post(verifyToken, costControllers.createNewCost);

router
  .route("/month/:id/:index")
  .get(verifyToken, costControllers.getMonthCosts);

router
  .route("/:id/:costId")
  .get(verifyToken, costControllers.getCost)
  .delete(verifyToken, costControllers.deleteCost)
  .patch(verifyToken, costControllers.updateCost);

module.exports = router;
