import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const { user } = useAuth();
  const [auth] = useAuth();

  const backgroundImageUrl = "url('https://images.unsplash.com/photo-1510247548804-1a5c6f550b2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"; // Replace with the actual path to your image

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-7" style={{ backgroundImage: backgroundImageUrl, backgroundSize: "cover", minHeight: "100vh", display: "flex", alignItems: "center" }}>
            <div className="card w-75 p-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <h3>Name: {auth?.user?.name}</h3>
              <h3>Email: {auth?.user?.email}</h3>
              <h3>Phone: {auth?.user?.phone}</h3>
              <h3>Location: {auth?.user?.location}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
