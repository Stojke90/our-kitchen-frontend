import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CardFoodCook = ({ cook }) => {
  // state for user(cook),data of user if user is logged-in
  const user = useSelector((state) => state.user.value);

  // css style for card
  const cardCss = {
    width: 300,
    margin: "1rem",
    height: "fit-content",
    backgroundColor: "#1e171547",
    border: "groove 5px #ff8c00",
    textDecoration: "none",
  };

  return (
    <>
      <Card
        sx={cardCss}
        component={user.role ? Link : "div"}
        to={`/Our Cooks/CookDetails/${cook._id}`}
      >
        <CardActionArea sx={{ backgroundColor: "#b01d1d" }}>
          <CardMedia
            sx={{ objectFit: "cover" }}
            component="img"
            height="300"
            image={cook.image}
            alt={cook.cook_name + " photo"}
          />

          <CardContent>
            <Typography
              mt={0.5}
              mb={0.5}
              align="center"
              variant="h4"
              color="#f5deb3"
              component="div"
              sx={{
                fontFamily: "'Dancing Script', cursive ",
                fontStyle: "italic",
              }}
            >
              {cook.cook_name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default CardFoodCook;
