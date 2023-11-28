import express from "express";

import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  userPhotoController,
  savePhotoController,
  updateAdminLocation ,
  getCurrentLocation,
  getDirectionsToAdminLocation,
  getUserDetailsById,
  
} from "../contrallers/authContraller.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { isAdmin,requireSignIn } from "../middlewares/authMiddleware.js";





//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);



//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn ,isAdmin,  testController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});


//update profile
router.put('/profile',  requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);



// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);



//get photo
router.get("/user-photo/:user.id", userPhotoController);

router.post('/auth/save-photo/:user.id', savePhotoController);

router.put("/admin/update-location", updateAdminLocation);

router.get("/user/current-location", getCurrentLocation);

// Create a route for users to get directions to the admin's location
router.get("/user/directions-to-admin", getDirectionsToAdminLocation);

router.get("/get-directions", requireAuth, getDirectionsToAdminLocation);

router.get("/get-user-details-by-id/:userId", getUserDetailsById);


export default router;