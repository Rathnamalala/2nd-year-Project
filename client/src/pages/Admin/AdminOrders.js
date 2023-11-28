import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import {
  Select,
  Grid,
  Typography,
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Avatar,
  Box,
  CardMedia,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  productCard: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  productMedia: {
    width: 150,
    height: 150,
  },
  productDetails: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(2),
  },
  quantity: {
    fontWeight: "bold",
    color: "green",
    fontSize: "1.2rem",
  },
  productInfo: {
    margin: theme.spacing(1, 0),
  },
}));

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Ready",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const classes = useStyles();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="All Orders Data">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <AdminMenu />
        </Grid>
        <Grid item xs={9}>
          <Paper elevation={3}>
            <Box p={3}>
              <Typography variant="h4" align="center" gutterBottom>
                All Orders
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Buyer</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Payment</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Product Photo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((o, i) => (
                    <TableRow key={o._id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel>Status</InputLabel>
                          <Select
                            value={o?.status}
                            onChange={(e) => handleChange(o._id, e.target.value)}
                            label="Status"
                          >
                            {status.map((s, index) => (
                              <MenuItem key={index} value={s}>
                                {s}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>{o?.buyer?.name}</TableCell>
                      <TableCell>{moment(o?.createAt).format("DD/MM/YYYY")}</TableCell>
                      <TableCell>
                        {o?.payment.success ? (
                          <CheckCircleOutlineIcon style={{ color: "green" }} />
                        ) : (
                          <CancelIcon style={{ color: "red" }} />
                        )}
                      </TableCell>
                      <TableCell>
                        <ul>
                          {o?.quantities.map((quantityItem, index) => (
                            <li key={index}>
                              <span className={classes.quantity}>
                                {quantityItem.quantity}Kg
                              </span>
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <CardMedia
                          className={classes.productMedia}
                          component="img"
                          alt={o?.products[0].name}
                          image={`/api/v1/product/product-photo/${o?.products[0]._id}`}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AdminOrders;
