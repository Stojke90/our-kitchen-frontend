import { Grid, Typography } from "@mui/material";
import React from "react";

const HidenImage = ({ center, foodImg }) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={5}
      lg={5}
      xl={5}
      sx={center}
      style={{
        border: "groove 3px orangered",
        padding: "1rem",
        maxHeight: "350px",
        overflow: "hidden",
        background: "#ffffff38",
      }}
    >
      {foodImg ? (
        <img src={foodImg} alt="slika" style={{ width: "100%" }} />
      ) : (
        <Typography variant="h5" component="p" color="secondary">
          Choose your meal image!!!
        </Typography>
      )}
    </Grid>
  );
};

export default HidenImage;
