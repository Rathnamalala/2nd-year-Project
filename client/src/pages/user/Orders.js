import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import Box from "@mui/material/Box";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Grid,
  Avatar,
  Button,
} from "@material-ui/core";
import RoomIcon from "@mui/icons-material/Room";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
  card: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  cardMedia: {
    width: 100,
    height: 100,
  },
  cardContent: {
    flex: "1",
    paddingLeft: theme.spacing(2),
  },
  success: {
    color: "green",
  },
  failed: {
    color: "red",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const OrderTable = ({ order }) => {
  const classes = useStyles();
  const locations = [
    { latitude: 5.933378743390014, longitude: 80.59188792247188 },
    { latitude: 6.277835984119728, longitude: 80.04078508134045 },
    // Add more locations as needed
  ];

  const [selectedLocation, setSelectedLocation] = useState(null);

  const openRandomGoogleMaps = () => {
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    setSelectedLocation(randomLocation);
    openGoogleMapsUrl(randomLocation);
  };

  const openGoogleMapsUrl = (location) => {
    const { latitude, longitude } = location;
    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Seller</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Product</TableCell>
          
            <TableCell>Pick Up Point</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell
              className={order?.payment.success ? classes.success : classes.failed}
            >
              {order?.status}
            </TableCell>
            <TableCell>
              <Avatar className={classes.avatar}>
                {order?.buyer?.name[0].toUpperCase()}
              </Avatar>
              {order?.buyer?.name}
            </TableCell>
            <TableCell>{moment(order?.createAt).fromNow()}</TableCell>
            <TableCell>
              {order?.payment.success === true && order.payment.id === "COD" ? (
                <p>COD</p>
              ) : order?.payment.success === true ? (
                <p>Success</p>
              ) : (
                <p>Failed</p>
              )}
            </TableCell>
            <TableCell>
              <List>
                {order?.quantities.map((quantityItem, index) => (
                  <ListItem key={index}>
                    <ListItemText>{quantityItem.quantity}Kg</ListItemText>
                  </ListItem>
                ))}
              </List>
            </TableCell>
            <TableCell>
              {order?.products.map((product) => (
                <img
                  key={product._id}
                  src={`/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  style={{ width: "50px", height: "50px", marginRight: "5px" }}
                />
              ))}
            </TableCell>
            
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={openRandomGoogleMaps}
                startIcon={<RoomIcon />}
                className={classes.button}
              >
                Find Location
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ProductList = ({ products }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={4}>
      {products.map((product, i) => (
        <Grid item xs={18} sm={10} key={product._id}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              component="img"
              alt={product.name}
              image={`/api/v1/product/product-photo/${product._id}`}
            />
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const Orders = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <Container className={classes.tableContainer}>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <Typography variant="h4" align="center" gutterBottom>
              All Orders
            </Typography>
            {orders?.map((order, i) => (
              <Card key={i} className={classes.card}>
                <OrderTable order={order} />
                <Box className={classes.cardContent}>
                  <ProductList products={order.products} />
                </Box>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Orders;
