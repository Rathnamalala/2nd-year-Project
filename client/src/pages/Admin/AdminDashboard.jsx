import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import styled from "styled-components";
import ProfilePhoto from "./ProfilePhoto"; // Import the ProfilePhoto component

const Container = styled.div`
  margin-top: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
`;

const CardTitle = styled.h3`
  color: #007bff;
  font-size: 24px;
`;

const CardText = styled.h5`
  margin: 10px 0;
`;

const EditButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [location, setLocation] = useState(null);
  const [addressInput, setAddressInput] = useState("");

  // Initialize the geocoder service
  const geocoder = new window.google.maps.Geocoder();

  const setAddress = () => {
    geocoder.geocode({ address: addressInput }, (results, status) => {
      if (status === "OK" && results[0]) {
        const geometry = results[0].geometry.location;
        const lat = geometry.lat();
        const lng = geometry.lng();
        setLocation({ lat, lng, address: addressInput });

        // Save the location to the database
        saveLocationToDatabase(lat, lng, addressInput);
      }
    });
  };

  const saveLocationToDatabase = (latitude, longitude, address) => {
    // Send a POST request to your API endpoint to save the location
    fetch("/api/v1/admin/update-location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latitude, longitude, address }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Location saved:", data);
      })
      .catch((error) => {
        console.error("Error saving location:", error);
      });
  };

  return (
    <Layout>
      <Container>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <Card>
                <CardTitle>Seller Information</CardTitle>
                <ProfilePhoto />
                <CardText>
                  <strong>Name:</strong> {auth?.user?.name}
                </CardText>
                <CardText>
                  <strong>Email:</strong> {auth?.user?.email}
                </CardText>
                <CardText>
                  <strong>Contact:</strong> {auth?.user?.phone}
                </CardText>
                <div>
                  <strong>Location:</strong>{" "}
                  {location
                    ? `${location.address} (Lat: ${location.lat}, Lng: ${location.lng})`
                    : "Location not set"}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter address"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                  />
                  <button onClick={setAddress}>Set Location</button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default AdminDashboard;
