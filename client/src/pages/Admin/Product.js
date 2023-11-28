import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const useStyles = makeStyles(() => ({
  productCard: {
    maxWidth: 345,
    margin: "30px", // Adjust margin as needed
    transition: 'transform 0.2s', // Add a transition for the "transform" property
    '&:hover': {
      transform: 'scale(1.05)', // Scale up the card on hover
    },
  },
  
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px", // Adjust margin as needed
  },
  readMoreButton: {
    margin: "10px 1", // Add margin to create space between buttons
  },
  starRating: {
    color: 'green', // Adjust the color as needed
  },
  quantityHighlight: {
    backgroundColor: 'yellow', // Adjust the color as needed
    padding: '2px 4px', // Adjust padding as needed
  },

}));

const Products = () => {
  const [products, setProducts] = useState([]);
  const classes = useStyles();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Function to render star ratings
  const renderStarRatings = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarIcon key={i} className={classes.starRating} />);
      } else {
        stars.push(<StarBorderIcon key={i} className={classes.starRating} />);
      }
    }
    return stars;
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                 <Card className={classes.productCard} key={p._id}>
                <CardMedia
                  component="img"
                  alt={p.name}
                  height="200"
                  image={`/api/v1/product/product-photo/${p._id}`}
                />
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" component="div">
                  <span style={{ fontWeight: 'bold' }}>{p.name}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    In Stock -<span className={classes.quantityHighlight}>{p.quantity}kg</span>
                  </Typography>
                  <Typography variant="h6" color="red">
                    1Kg - <span style={{ fontWeight: 'bold' }}> Rs.{p.price}</span>
                  </Typography>

                  {/* Render star ratings here */}
                  <div>{renderStarRatings(p.rating)}</div>
                  <div className={classes.buttonGroup}>
                    <Button variant="contained" color="primary" >
                      Add to Cart
                    </Button>
                    
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
