import React, { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import image1 from '../../../src/img/hero.jpg';
import image2 from '../../../src/img/hero2.jpg';

const HeroSection = () => {
  const [backgroundImages, setBackgroundImages] = useState([
    `url(${image1})`,
    `url(${image2})`,
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonColor, setButtonColor] = useState("#2ecc71"); // Initial green color

  const changeBackgroundImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const changeButtonColor = () => {
    // Generate a random shade of green
    const randomGreenShade = `#${Math.floor(Math.random() * 256).toString(16).padStart(2, "0")}EA${Math.floor(Math.random() * 256).toString(16).padStart(2, "0")}`;
    setButtonColor(randomGreenShade);
  };

  useEffect(() => {
    const intervalId = setInterval(changeBackgroundImage, 7000);
    const colorChangeIntervalId = setInterval(changeButtonColor, 3000);

    return () => {
      clearInterval(intervalId);
      clearInterval(colorChangeIntervalId);
    };
  }, []);

  const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: buttonColor,
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "bold",
      transform: "skewX(0deg)",
      transition: "background-color 0.1s ease-in-out",
      "&:hover": {
        backgroundColor: "#27ae60", // Darker green on hover
      },
    },
    
    cornerText: {
      fontSize: "45px",
      color: "#000",
      textAlign: "center",
      transform: "skewX(0deg)",
      marginBottom: "10px",
    },
  }));

  const classes = useStyles();

  const scrollToMiddleOfPage = () => {
    // Calculate the middle of the page
    const middleOfPage = document.documentElement.scrollHeight / 2;
    // Scroll to the middle of the page
    window.scrollTo({
      top: middleOfPage,
      behavior: "smooth", // Optional: Add smooth scrolling
    });
  };

  return (
    <Box
      sx={{
        backgroundImage: backgroundImages[currentIndex],
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "85vh",
        minWidth: "85vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "#000",
        textAlign: "center",
        padding: "10px",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", left: "100px", bottom: "90px" }}>
        <Button className={classes.button} onClick={scrollToMiddleOfPage}>
          Shop now
        </Button>
        
      </div>
    </Box>
  );
};

export default HeroSection;
