const express = require("express");
const investmentControllers = require("./../controllers/investmentController.js");
const { verifyToken } = require("./../middleWare/tokenVerification.js");

const router = express.Router();

router
  .route("/:id")
  .get(verifyToken, investmentControllers.getAllInvestments)
  .post(verifyToken, investmentControllers.createNewInvestment);

router
  .route("/month/:id/:index")
  .get(verifyToken, investmentControllers.getMonthInvestments);

router
  .route("/:id/:investmentId")
  .get(verifyToken, investmentControllers.getInvestment)
  .delete(verifyToken, investmentControllers.deleteInvestment)
  .patch(verifyToken, investmentControllers.updateInvestment);

module.exports = router;
