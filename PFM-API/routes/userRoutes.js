const express = require("express");
const userController = require("./../controllers/userController.js");
const { verifyToken } = require("./../middleWare/tokenVerification.js");
const pdfService = require("./../services/pdf.js");

const router = express.Router();

router
  .route("/")
  .get(verifyToken, userController.getAllUsers)
  .post(verifyToken, userController.createNewUser);

router
  .route("/:id")
  .get(verifyToken, userController.getUser)
  .patch(verifyToken, userController.updateUser)
  .delete(verifyToken, userController.DeleteUser);

router.route("/login").post(userController.loginUser);
router.route("/register").post(userController.registerUser);

router.route("/email/:id").post(verifyToken, pdfService.getPdf);

module.exports = router;
