import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ProfilePhoto = () => {
  const [photo, setPhoto] = useState(null);

  // Function to handle photo upload
  const handleUpload = async () => {
    try {
      if (!photo) {
        toast.error("Please select a photo to upload.");
        return;
      }

      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("photo", photo);

      // Make a POST request to the server to save the photo
      const response = await axios.post("/api/v1/auth/save-photo", formData);

      if (response.data?.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to upload photo.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while uploading the photo.");
    }
  };

  return (
    <div className="col-md-9">
      <div className="m-1 w-75">
        <div className="mb-3">
          <label className="btn btn-outline-secondary col-md-12">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              hidden
            />
          </label>
        </div>

        <div className="mb-3">
          <button className="btn btn-primary" onClick={handleUpload}>
            Upload Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;
