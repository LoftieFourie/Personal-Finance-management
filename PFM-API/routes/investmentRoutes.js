const express = require("express");
const investmentControllers = require("./../controllers/investmentController.js");

const router = express.Router();

router
  .route("/:id")
  .get(investmentControllers.getAllInvestments)
  .post(investmentControllers.createNewInvestment);

router
  .route("/month/:id/:index")
  .get(investmentControllers.getMonthInvestments);

router
  .route("/:id/:investmentId")
  .get(investmentControllers.getInvestment)
  .delete(investmentControllers.deleteInvestment)
  .patch(investmentControllers.updateInvestment);

module.exports = router;
