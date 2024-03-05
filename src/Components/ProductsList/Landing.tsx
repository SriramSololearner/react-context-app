import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { StyleSheet } from "./Product";
import { Context } from "../../Context/Products/context";
import { Rating } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Landing = () => {
  const context = useContext(Context);

  const CallApi = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    context?.setState(data.products);
    context?.setProducts(data.products);
  };

  useEffect(() => {
    CallApi();

    // let userToken = localStorage.getItem('token');
    // fetch('https://dummyjson.com/products/')
    //     .then(response => response.json())
    //     .then(data => setState(data.products))
    //     .catch(error => console.log(error))
  }, []);
  return (
    <Grid container sx={{ padding: "105px" }} spacing={5}>
      {context?.products.map((product, ind) => (
        <Grid container key={ind} item xs={12} sm={6} md={4} lg={3} xl={3}>
          <Card sx={StyleSheet.Card}>
            <Box
              component={"img"}
              src={product.images[0]}
              sx={{ margin: "20px", width: "80%", height: "50%" }}
            ></Box>

            <Box sx={{ fontWeight: "600", padding: "10px" }}>
              {product.title}
            </Box>

            <Box sx={{ fontSize: "13px", padding: "20px" }}>
              {product.description}
            </Box>

            <Box sx={{ fontSize: "15px", padding: "10px", color: "grey" }}>
              Price :₹{product.price} &nbsp; stock: {product.stock}
            </Box>

            {/* Rating */}

            <Box>
              <Rating
                name="read-only"
                value={product.rating}
                precision={product.rating}
                readOnly
              />
            </Box>

            {context.index === ind ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: "20px",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => context?.Inc(product.id)}
                  sx={{ fontWeight: "500" }}
                >
                  +
                </Button>
                <Box sx={{ ml: "8px", mr: "8px", fontWeight: 600 }}>
                  {" "}
                  {context?.cartList?.map((obj) => {
                    if (obj.id === product.id) {
                      return obj.qty;
                    }
                  })}
                </Box>

                <Button
                  variant="outlined"
                  onClick={() => context.Dec(product.id)}
                  sx={{ fontWeight: 600 }}
                >
                  -
                </Button>
              </Box>
            ) : (
              <Box sx={StyleSheet.btnGrp}>
                {/* <Button sx={StyleSheet.button} onClick={() => handleNavigate(product.id)} >View Details</Button> */}

                <Button
                  onClick={() => context.handleAddCart(product, ind)}
                  sx={StyleSheet.button}
                >
                  Add Cart
                </Button>
              </Box>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Landing;
