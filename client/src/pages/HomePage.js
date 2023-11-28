import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Prices } from "../components/Price";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import FeaturesSection from "../components/Layout/FeatureSection"
import HeroSection from "../../src/components/Layout/Hero";
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import PosterSlider from "../components/Layout/PosterSlider"
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineReload } from "react-icons/ai";
import backgroundImage from "../img/11.jpg"; 


const useStyles = makeStyles(() => ({
  productCard: {
    maxWidth: 345,
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)", // Add a box shadow to the card
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
  categoryContainer: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
  },
  categoryTitle: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "blue",
  },
  categoryList: {
    display: "flex",
    flexDirection: "row", // Horizontal layout
    flexWrap: "wrap", // Allow items to wrap to the next row
    gap: "8px", // Adjust the gap between categories
  },
  categoryLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "16px",
    marginRight: "10px", // Adjust spacing between categories
  },
  categoryCheckbox: {
    marginRight: "5px",
  },
}));





const HomePage = () => {
  const classes = useStyles();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);

      // Calculate the average rating for each product
      const productsWithAvgRating = data.products.map((product) => ({
        ...product,
        avgRating: calculateAverageRating(product.ratings),
      }));

      setProducts(productsWithAvgRating);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);


  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      const productsWithAvgRating = data.products.map((product) => ({
        ...product,
        avgRating: calculateAverageRating(product.ratings),
      }));
      setProducts(productsWithAvgRating);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStarRatings = (avgRating) => {
    if (avgRating !== undefined) {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= avgRating) {
          stars.push(<StarIcon key={i} className={classes.starRating} />);
        } else {
          stars.push(<StarBorderIcon key={i} className={classes.starRating} />);
        }
      }
      return (
        <div>
          {stars}
        </div>
      );
    }
  };
  // Calculate the average rating for a product
  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) {
      return 0;
    }
    const totalRating = ratings.reduce((sum, rating) => sum + rating.value, 0);
    return totalRating / ratings.length;
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"All products -  Best offers "} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Container fluid>
        <Row className="mt-5">
          <Col md={4} className="offset-md-1 text-center"> {/* Move the column to the right */}
            <HeroSection />
          </Col>
        </Row>
      </Container>




      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <div className={classes.categoryContainer} >
            <h4 className={classes.categoryTitle} style={{ Color: 'darkgreen' }}>Filter By Category</h4>
            <div className={classes.categoryList}>
              {categories?.map((c) => (
                <label key={c._id} className={classes.categoryLabel} >
                  <Checkbox
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    className={classes.categoryCheckbox} style={{ marginBottom: '20px' }}
                  />
                  {c.name}
                </label>
              ))}
            </div>
          </div>

          {/* Price filter */}
          <h4 className="text-center mt-4"  >
            Filter By Price
          </h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id} style={{ marginBottom: '20px' }}>
                  <Radio value={p.array} style={{ fontSize: '16px', color: 'green' }}>
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-md-9" style={{ marginBottom: '30px', fontSize: '28px', color: 'darkgreen' }}>
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Card className={classes.productCard} key={p._id}>
                <CardMedia
                  component="img"
                  alt={p.name}
                  height="200"
                  image={`/api/v1/product/product-photo/${p._id}`}
                  onClick={() => navigate(`/product/${p.slug}`)}
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
                  <div>{renderStarRatings(p.avgRating)}</div>
                  <div className={classes.buttonGroup}>

                    <Button variant="contained" color="primary"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}>
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <FeaturesSection />
    </Layout>
  );
};

export default HomePage;
