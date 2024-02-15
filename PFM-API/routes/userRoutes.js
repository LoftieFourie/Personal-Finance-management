const express = require("express");
const userController = require("./../controllers/userController.js");

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.DeleteUser);

router.route("/login").post(userController.loginUser);
router.route("/register").post(userController.registerUser);

module.exports = router;
