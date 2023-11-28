import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import LocationAutocomplete from './LocationAutocomplete';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  
  const [latLng, setLatLng] = useState(null);

  const handleLocationChange = (newLatLng) => {
    setLatLng(newLatLng);
  };

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the password meets the minimum length requirement
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return;
      }

      // Check if the phone number is 10 characters and contains only numbers
      if (!/^\d{10}$/.test(phone)) {
        toast.error("Phone number must be 10 digits and contain only numbers.");
        return;
      }

      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        location,
        role,
      });

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommerce App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-control"
            >
              <option value="user">Customer</option>
              <option value="admin">Seller</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Your Password"
              required
            />
            {password.length > 0 && password.length < 8 && (
              <p className="text-danger">Password must be at least 8 characters long.</p>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              placeholder="Enter Your Phone"
              required
            />
            {phone.length > 0 && !/^\d{10}$/.test(phone) && (
              <p className="text-danger">Phone number must be 10 digits and contain only numbers.</p>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              placeholder="Enter Your Address"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
