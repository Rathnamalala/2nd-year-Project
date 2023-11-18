import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FeatureCard = ({ title, description }) => (
  <div className="col">
    <div className="card mb-3 border-0">
      <div className="row">
        <div className="col-md-2 text-dark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M21.5 15a3 3 0 0 0-1.9-2.78l1.87-7a1 1 0 0 0-.18-.87A1 1 0 0 0 20.5 4H6.8l-.33-1.26A1 1 0 0 0 5.5 2h-2v2h1.23l2.48 9.26a1 1 0 0 0 1 .74H18.5a1 1 0 0 1 0 2h-13a1 1 0 0 0 0 2h1.18a3 3 0 1 0 5.64 0h2.36a3 3 0 1 0 5.82 1a2.94 2.94 0 0 0-.4-1.47A3 3 0 0 0 21.5 15Zm-3.91-3H9L7.34 6H19.2ZM9.5 20a1 1 0 1 1 1-1a1 1 0 0 1-1 1Zm8 0a1 1 0 1 1 1-1a1 1 0 0 1-1 1Z"/>
          </svg>
        </div>
        <div className="col-md-10">
          <div className="card-body p-0">
            <h5>{title}</h5>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FeaturesSection = () => {
  const featureData = [
    {
      title: "Environmentally Friendly Packaging",
      description: "Our commitment goes beyond products; we use eco-friendly packaging to reduce waste and environmental impact.",
    },
    {
      title: "Organic Goodness",
      description: "From 100% organic fruits to fresh, chemical-free vegetables, we bring you the purest and healthiest options for your kitchen.",
    },
    {
      title: "Farm-to-Table Freshness",
      description: "Experience the delight of farm-fresh products delivered right to your doorstep, ensuring quality and taste.",
    },
    {
      title: "Reducing Carbon Footprint",
      description: "We take pride in reducing our carbon footprint through every stage of production and delivery. Choose us for a greener future.",
    },
    {
      title: "Wide Product Range",
      description: "Explore our diverse selection of 100% carbonic and fresh products, ranging from organic fruits to sustainable gardening supplies.",
    },
  ];

  const settings = {
    infinite: true, // Loop the carousel
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 4, // Display 4 cards at a time
    slidesToScroll: 1, // Slide 1 card at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set the autoplay speed in milliseconds (e.g., 3 seconds)
    pauseOnHover: true, // Pause autoplay when hovering over a card
    responsive: [
      {
        breakpoint: 992, // Change the settings when the screen size is less than 992px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Change the settings when the screen size is less than 768px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576, // Change the settings when the screen size is less than 576px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    
  };

  return (
    <section className="py-5">
      <div className="container-fluid">
        <Slider {...settings}>
          {featureData.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturesSection;
