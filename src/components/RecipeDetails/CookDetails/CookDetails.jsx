import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const CookDetails = ({ cook, date }) => {
  // css style for card
  const cardStyle = {
    maxWidth: 220,
    margin: "3rem auto",
    border: " groove #f1efee 2px",
    borderRadius: " 10%",
    background: " #f0f8ff54",
    opacity: 0,
    animation: "bounce 1.5s ease-out 2.5s alternate both running",
    "@keyframes bounce": {
      "0%": {
        opacity: 1,
        transform: "scale(0.0125) ",
        borderRadius: "100%",
      },
      "50%": {
        transform: "scale(1.25) ",
      },
      "75%": {
        transform: "scale(1.15) ",
      },
      "100%": {
        opacity: 1,
        transform: "scale(1) ",
      },
    },
  };
  return (
    <Card sx={cardStyle}>
      <CardHeader
        titleTypographyProps={{ color: "#ff4500", textAlign: "center" }}
        title="Recipe by"
      />
      <CardMedia
        component="img"
        height="250"
        image={cook.image}
        alt={cook.cook_name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="white">
          {cook.cook_name}
        </Typography>
        <Typography variant="body2" color="white">
          {"Recipe create: " + date.slice(0, 10).split("-").reverse().join("/")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{ margin: "auto" }}
          color="warning"
          variant="contained"
          component={Link}
          to={`/Our Cooks/CookDetails/${cook._id}`}
        >
          See profile
        </Button>
      </CardActions>
    </Card>
  );
};

export default CookDetails;
