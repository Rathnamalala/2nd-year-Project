import userModel from "../models/userModels.js";
import orderModel from "../models/orderModel.js";
import AdminLocation from "../models/adminLocationModel.js";


import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export  const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, location,role } = req.body;
    //validations

    

    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!location) {
      return res.send({ message: "Location is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      location,
      role: role === "admin" ? 1 : 0, // Set the role based on the user's choice
      
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  } 
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    } 
     //check user
     const user = await userModel.findOne({ email });
     if (!user) {
       return res.status(404).send({
         success: false,
         message: "Email is not registerd",
       });
     }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        adddress: user.address,
        role:user.role,
      },
      token,
    });
    
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }  
  
}

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!location) {
      res.status(400).send({ message: "location is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",  
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};



//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    // Update profile picture
    if (req.file) {
      user.photo.data = req.file.buffer;
      user.photo.contentType = req.file.mimetype;
    }

    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo","name","price")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo","name","price")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};


// get photo
export const userPhotoController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.pid).select("photo");
    if (user.photo.data) {
      res.set("Content-type", user.photo.contentType);
      return res.status(200).send(user.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

export const savePhotoController = async (req, res) => {
  try {
    const { _id } = req.params; // Assuming you pass the user ID as a parameter
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).send({
        success: false,
        message: "No file uploaded",
      });
    }

    // Update the user's photo field with the uploaded photo data
    user.photo.data = req.file.buffer;
    user.photo.contentType = req.file.mimetype;

    // Save the updated user data
    await user.save();

    res.status(200).send({
      success: true,
      message: "Photo saved successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while saving photo",
      error,
    });
  }
};


export const updateAdminLocation = async (req, res) => {
  try {
    const { longitude, latitude } = req.body;
    const adminId = req.params.adminId;

    const adminLocation = await AdminLocation.findOneAndUpdate(
      { adminId: adminId },
      { longitude, latitude },
      { new: true }
    );

    if (!adminLocation) {
      return res.status(404).json({ success: false, message: "Admin location not found" });
    }

    res.status(200).json({ success: true, message: "Admin location updated", adminLocation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating admin location", error });
  }
};


export const getCurrentLocation = async (req, res) => {
  try {
    // Assuming you have the user's ID in the request
    const userId = req.user._id;

    // Find the user by their ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const userLocation = user.location;

    res.status(200).send({
      success: true,
      message: "User's current location retrieved successfully",
      location: userLocation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting user's current location",
      error,
    });
  }
};



export const getDirectionsToAdminLocation = async (req, res) => {
  try {
    // Assuming you have the user's ID in the request
    const userId = req.user._id;

    // Find the user by their ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const userLocation = user.location;

    // Retrieve the admin's location from the database
    const adminLocation = await AdminLocation.findOne();

    if (!adminLocation) {
      return res.status(404).send({
        success: false,
        message: "Admin's location not found",
      });
    }

    // Now, you can use the retrieved adminLocation to calculate directions
    const directions = await googleMapsApi.calculateDirections({
      origin: `${userLocation.coordinates[1]},${userLocation.coordinates[0]}`,
      destination: `${adminLocation.latitude},${adminLocation.longitude}`,
      // Additional options and parameters as needed
    });

    res.status(200).send({
      success: true,
      message: "Directions to admin's location retrieved successfully",
      directions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting directions to admin's location",
      error,
    });
  }
};