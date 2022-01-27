import { Typography } from "@mui/material";
import React from "react";

const ErrorPage = () => {
  return (
    <Typography
      sx={{
        display: "block",
        margin: "auto",
        textAlign: "center",
        "@media (max-width: 900px)": { minHeight: "80vh", paddingTop: "30vh" },
        "@media (max-width: 500px)": { fontSize: "2.5rem" },
      }}
      variant="h3"
      color="error"
    >
      Error 404 page not found
    </Typography>
  );
};

export default ErrorPage;
