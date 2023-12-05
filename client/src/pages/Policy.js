import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://t3.ftcdn.net/jpg/02/72/24/76/360_F_272247623_GmzIc6nAHj7OAFlIRxVdiNkaRoGT3ZsA.jpg"
            alt="contactus"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </div>
        <div className="col-md-6">
        <div className="policy-content">
        <h2 className="bg-dark p-3 text-white text-center">Privacy Policy</h2>
        <p className="text-justify mt-2">
        Welcome to our Privacy Policy page. This page outlines how we collect, use, and protect your personal information when you use our website.
        </p>
        <h3>Information We Collect</h3>
            <p>
              We may collect information such as your name, email address, and browsing behavior when you interact with our site.
            </p>

            <h3>How We Use Your Information</h3>
            <p>
              Your information is important to us. We use it to provide and improve our services, personalize your experience, and send you relevant information.
            </p>

            <h3>Security</h3>
            <p>
              We take the security of your information seriously and implement robust measures to protect it, ensuring your data remains safe.
            </p>
           
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;