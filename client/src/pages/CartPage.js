import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  TextField,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  // Update quantity state when cart changes
  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item._id] = 1; // Initialize quantity to 1
    });
    setQuantities(initialQuantities);
  }, [cart]);

  // Update quantity when input changes
  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  // Update quantity and recalculate total when "Update Quantity" button is clicked
  const updateQuantity = (productId) => {
    // Perform any validation or checks here if needed
    // For example, make sure the quantity is greater than 0
    const updatedQuantity = quantities[productId];
    // Update the quantity in the state
    // Recalculate the total price
  };

  // Calculate total price based on quantity and price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        const itemTotal = item.price * quantities[item._id];
        total += itemTotal;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const quantitiesArray = Object.entries(quantities).map(([productId, quantity]) => ({ productId, quantity }));

      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
        quantities: quantitiesArray, // Include quantities in the request
      });

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const useStyles = makeStyles((theme) => ({
    container: {
      marginTop: theme.spacing(2),
    },
    card: {
      display: "flex",
      marginBottom: theme.spacing(2), // Add some space between card items
    },
    cardMedia: {
      width: 100,
      height: 100,
    },
    cardContent: {
      flex: "1 0 auto",
    },
    cartSummary: {
      marginTop: "1rem",
      marginRight: "1rem",
      marginLeft: "5rem",
      // Add margin to create space between cart summary and card content
    },
  }));

  const classes = useStyles();

  return (
    <Layout>
      <Container className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              {`Hello, ${auth?.token && auth?.user?.name}`}
            </Typography>
            <Typography variant="h6" align="center">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please log in to checkout"
                  }`
                : "Your Cart Is Empty"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={7} >
            {cart?.map((p) => (
              <Card key={p._id} className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={`/api/v1/product/product-photo/${p._id}`}
                  title={p.name}
                />
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6">{p.name}</Typography>
                  <Typography>{p.description.substring(0, 30)}</Typography>
                  <Typography>Price : {p.price}</Typography>
                  <InputLabel>Quantity:</InputLabel>
                  <TextField
                    type="number"
                    value={quantities[p._id]}
                    onChange={(e) =>
                      handleQuantityChange(p._id, parseInt(e.target.value, 10))
                    }
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => updateQuantity(p._id)}
                  >
                    Update Quantity
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Grid item xs={3} className={classes.cartSummary}>
            <Typography variant="h3">Cart Summary</Typography>
            <Typography variant="h5">Total | Checkout | Payment</Typography>
            <hr />
            <Typography variant="h5">Total: {totalPrice()}</Typography>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <Typography variant="h4">Current Address</Typography>
                  <Typography variant="h5">{auth?.user?.address}</Typography>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </Button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Log In to Checkout
                  </Button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </Button>
                </>
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default CartPage;
