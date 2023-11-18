import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextareaAutosize,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Rating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const useStyles = {
  container: {
    padding: "16px",
    margin: "16px",
    backgroundColor: "#f5f5f5",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    size: "90%",
    padding: "6px",
  },
  cardContent: {
    flex: "1 0 auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9 aspect ratio
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  description: {
    fontStyle: "italic",
  },
  price: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  category: {
    margin: "16px 0",
  },
  seller: {
    margin: "16px 0",
  },
  addToCartButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
  starRating: {
    color: "#FFD700",
  },
  userRatingSection: {
    margin: "16px 0",
  },
  userRatingInput: {
    margin: "8px 0",
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  submitButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
  quantityHighlight: {
    fontWeight: "bold",
  },
  priceHighlight: {
    fontWeight: "bold",
    color: "red",
  },
};

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [productRatings, setProductRatings] = useState([]);
  const [productReviews, setProductReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      setProductRatings(data?.product.ratings);
      setProductReviews(data?.product.reviews);
      calculateAverageRating(data?.product.ratings);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    if (product) {
      setCart([...cart, product]);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const renderStarRatings = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarIcon key={i} className={useStyles.starRating} />);
      } else {
        stars.push(<StarBorderIcon key={i} className={useStyles.starRating} />);
      }
    }
    return stars;
  };

  const submitRating = async () => {
    try {
      const response = await axios.post(`/api/v1/product/add-rating`, {
        productId: product._id,
        ratingValue: userRating,
      });

      if (response.data.success) {
        toast.success("Rating added successfully");
      } else {
        toast.error("Failed to add rating");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add rating");
    }
  };

  const submitReview = async () => {
    try {
      const response = await axios.post(`/api/v1/product/add-review`, {
        productId: product._id,
        reviewText: userReview,
      });

      if (response.data.success) {
        toast.success("Review added successfully");
      } else {
        toast.error("Failed to add review");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add review");
    }
  };

  const calculateAverageRating = (ratings) => {
    if (ratings.length > 0) {
      const totalRatings = ratings.reduce((acc, rating) => acc + rating.value, 0);
      const average = totalRatings / ratings.length;
      setAverageRating(average);
    } else {
      setAverageRating(0);
    }
  };

  return (
    <Layout>
      <Grid container style={useStyles.container}>
        <Grid item md={5}>
          <Card style={{...useStyles.card, margin: '8px'}}>
            <CardMedia
              style={{...useStyles.media}}
              image={product && product._id ? `/api/v1/product/product-photo/${product._id}` : ''}
              title={product.name}
            />
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card style={useStyles.card}>
            <CardContent style={useStyles.cardContent}>
              <Typography variant="h2" component="div" style={useStyles.title}>
                {product.name}
              </Typography>
              <Typography variant="body1" style={useStyles.description}>
                {product.description}
              </Typography>
              <Typography variant="h5" style={useStyles.price}>
                Price: Rs.{product.price}
              </Typography>
              <Typography variant="body2" style={useStyles.category}>
                Category: {product?.category?.name}
              </Typography>
              <Typography variant="body2" style={useStyles.seller}>
                Seller: {product?.user?.name}
              </Typography>
              <div style={useStyles.userRatingSection}>
                <Typography variant="h5">Product Rating:</Typography>
                <Rating name="averageRating" value={averageRating} readOnly />
              </div>
              <Button
                variant="contained"
                style={useStyles.addToCartButton}
                onClick={addToCart}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container style={useStyles.container}>
        <Grid item md={6}>
          <div style={useStyles.userRatingSection}>
            <Typography variant="h5">User Rating:</Typography>
            <Rating
              name="userRating"
              value={userRating}
              onChange={(event, newValue) => setUserRating(newValue)}
            />
            <br/>
            <Button
              variant="contained"
              style={useStyles.submitButton}
              onClick={submitRating}
            >
              Submit Rating
            </Button>
          </div>
        </Grid>
        <Grid item md={6}>
          <div style={useStyles.userRatingSection}>
            <Typography variant="h5">User Review:</Typography>
            <TextareaAutosize
              style={useStyles.userRatingInput}
              rowsMin={4}
              placeholder="Write your review here..."
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
            />
            <Button
              variant="contained"
              style={useStyles.submitButton}
              onClick={submitReview}
            >
              Submit Review
            </Button>
          </div>
        </Grid>
      </Grid>

      
      <Grid container style={useStyles.container}>
      <div style={useStyles.userRatingSection}>
        <Typography variant="h5">Product Reviews:</Typography>
        <List>
          {productReviews.map((review, index) => (
            <div key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText primary={review.user} secondary={review.text} />
              </ListItem>
              {index < productReviews.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </div>
    </Grid>

      <Grid container style={useStyles.container}>
        <Grid item md={12}>
          <Typography variant="h4">Similar Products</Typography>
          {relatedProducts.length < 1 && <p>No Similar Products found</p>}
        </Grid>
        <Grid item md={12}>
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <Card style={useStyles.card} key={p._id}>
                <CardMedia
                  style={useStyles.media}
                  image={`/api/v1/product/product-photo/${p._id}`}
                  title={p.name}
                />
                <CardContent style={useStyles.cardContent}>
                  <Typography variant="h2" style={useStyles.title}>
                    {p.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    In Stock - <span style={useStyles.quantityHighlight}>{p.quantity}kg</span>
                  </Typography>
                  <Typography variant="h5" color="red">
                    1Kg - <span style={useStyles.priceHighlight}>$ {p.price}</span>
                  </Typography>
                  <div>{renderStarRatings(p.rating)}</div>
                  <div style={useStyles.buttonGroup}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addToCart(p)}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProductDetails;
