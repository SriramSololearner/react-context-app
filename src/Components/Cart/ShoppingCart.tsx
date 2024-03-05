import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Context } from "../../Context/Products/context";
import { StyleSheet } from "./styles";
import cart from "../../Assets/cart.webp";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";

const ShoppingCart = () => {
  const context = useContext(Context);
  const navigator = useNavigate();

  //  dicouunt price
  let total: any = context?.cartList?.reduce((acc, val) => {
    return acc + val.price * val.qty;
  }, 0);

  let Discount = (total / 100) * 25;
  let DeliveryCharges = (total / 100) * 10;

  return (
    <Box sx={StyleSheet.MainContainer}>
      {/* Cart Items */}

      <Container sx={StyleSheet.CartContainer}>
        {context?.cartList.length === 0 ? (
          /* Cart Items Empty */

          <Box sx={StyleSheet.CartEmpty}>
            <Box component={"img"} src={cart} sx={StyleSheet.CartImg} />
            <Box>Missing Cart items?</Box>
            <Box sx={StyleSheet.LogTxt}>Please Add New Items</Box>
            <Box
              component={"button"}
              sx={StyleSheet.logBtn}
              onClick={() => navigator("/")}
            >
              Back
            </Box>
          </Box>
        ) : (
          <Box>
            {/* Cart List */}
            {context?.cartList.map((product) => (
              <Grid
                container
                spacing={8}
                key={product.id}
                mt={1}
                color={"grey"}
              >
                <Grid item xs={12} sm={8} lg={4} xl={5}>
                  <Box
                    component={"img"}
                    src={product.thumbnail}
                    alt="Product"
                    sx={{ width: "240px", height: "150px" }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: "20px",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Box>Price ₹{product.price}</Box>

                    <Box fontSize="15px" ml="90px">
                      {" "}
                      Quantity:
                      {context?.cartList?.map((obj) => {
                        if (obj.id === product.id) {
                          return obj.qty;
                        }
                      })}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={3} lg={6}>
                  <Box color={"blue"}> {product.description}</Box>
                  <Box color={"brown"} fontWeight={900} mt={"10px"}>
                    Price ₹{product.price * product.qty}
                  </Box>

                  <Button
                    variant="contained"
                    sx={{
                      mt: "15px",
                      "&:hover": {
                        boxShadow: "inset 0 0 100px 0px #578cc9",
                        transition: "1.5s ease",
                      },
                    }}
                    onClick={() => context.RemoveProduct(product.id)}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Box>
        )}
      </Container>

      {/* Checkout Container */}
      {context?.cartList.length !== 0 && (
        <Container
          sx={{
            width: "40%",
            height: "100%",
            bgcolor: "#ffffff",
            position: "sticky",
            top: "80px",
            mt: "10px",
            ml: "30px",
            mr: "30px",
            mb: "10px",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={20} sm={12} lg={12}>
              <Box sx={{ padding: "5px" }}>
                <Box
                  sx={{
                    color: "grey",
                    pb: "10px",
                    pt: "5px",
                    fontSize: "17px",
                  }}
                >
                  PRICE DETAILS
                </Box>
                <Divider component={"header"} />
                <Box sx={StyleSheet.ChecoutItems}>
                  <Box>Price({context?.cartList.length} items)</Box> ₹{total}
                </Box>
                <Box sx={StyleSheet.ChecoutItems}>
                  {" "}
                  <Box>Discount </Box>{" "}
                  <Box color={"green"}> - ₹{Discount.toFixed(0)} </Box>
                </Box>
                <Box sx={StyleSheet.ChecoutItems}>
                  {" "}
                  <Box>Delivery Charges</Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{ textDecoration: "line-through", color: "grey" }}
                    >{`₹${DeliveryCharges.toFixed(0)}`}</Typography>
                    <Box sx={{ color: "green", ml: "10px" }}>Free</Box>
                  </Box>
                </Box>
                <Divider component={"hr"} />
                <Box sx={StyleSheet.ChecoutItemsTotal}>
                  {" "}
                  <Box> Total Amount</Box>{" "}
                  <Box> ₹{(total - Discount).toFixed(0)}</Box>
                </Box>
                <Divider component={"hr"} />
                <Box color={"green"} sx={{ pt: "10px", pb: "10px" }}>
                  You will save ₹{Discount.toFixed(0)} on this order
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default ShoppingCart;
