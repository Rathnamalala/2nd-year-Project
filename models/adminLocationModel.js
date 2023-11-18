import mongoose from "mongoose";

const adminLocationSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  // You can include additional fields as needed for your application.
});


const AdminLocation = mongoose.model("AdminLocation", adminLocationSchema);

export default AdminLocation;