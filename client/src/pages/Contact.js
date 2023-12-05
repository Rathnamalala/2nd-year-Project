import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://media.istockphoto.com/id/1217108207/photo/shopping-or-delivery-fruits-and-vegetables.jpg?s=612x612&w=0&k=20&c=Fhd4ySZl4lwVoHCPcpOO-UOldzTUYPVEHaNc2cYp3KI="
            alt="contactus"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </div>
        <div className="col-md-6">
        <div className="contact-info">
          <h1 className="bg-dark p-3 text-white text-center">Get in touch</h1>
          <div className="contact-text"></div>
          <p>
          Have questions or need assistance with our products? We're here to help.
           </p>
           <p> Our support team is available 24/7 to assist you.</p>
           </div>
           <div className="contact-details">
              <div className="contact-item"></div>
              <BiMailSend /> <span>Email: <a href="mailto:help@ecommerceapp.com">help@ecommerceapp.com</a></span>
              </div>
              <div className="contact-item">
              <BiPhoneCall /> <span>Phone: 012-345-6789</span>
              </div>
              <div className="contact-item">
              <BiSupport /> <span>Toll-Free: 1800-0000-0000</span>
            
         
          
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;