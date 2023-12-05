import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
        <h2 className="bg-dark p-3 text-white text-center">About Us</h2>
        
          <img
            src="https://www.orlandohealth.com/-/media/images/blogs/2018/a-spread-of-many-fruits-and-vegetables-you-can-incorporate-into-to-your-diet.jpg?h=225&w=400&la=en"
            alt="contactus"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </div>
        <div className="col-md-6">
          <p className="text-justify mt-2">
          Welcome to ECO Agri Market Management, where our passion is to revolutionize the way we manage and distribute crops. Our journey began with a simple idea: to bridge the gap between farmers and consumers, ensuring that no crop goes to waste.
          </p>
          <p className="text-justify mt-2">
            With years of experience in Good Agriculture Practices, we have developed a cutting-edge system that streamlines communication, minimizes waste, and maximizes the efficiency of the agricultural supply chain.
          </p>
          <p className="text-justify mt-2">
            Our mission is to create a sustainable future for agriculture and reduce the wastage of crops. Join us in our endeavor to make a difference in the world of farming and fresh produce.

          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;