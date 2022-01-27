import { Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  // get this year
  const date = new Date().getFullYear();
  //css style for footer
  const footerStyle = {
    backgroundColor: "#000",
    color: "#fff",
    width: "100%",
    borderTop: "solid 1px #ffffff80",
    boxShadow: "0px -4px 19px 4px #ffffffba",
    "@media (max-width: 500px)": {
      fontSize: "1rem",
    },
  };
  return (
    <Typography
      p={2}
      align="center"
      variant="h5"
      component="div"
      sx={footerStyle}
    >
      Terms of use | Privacy Enviromental Policy Copyright © 2021-{date}{" "}
      {document.title} All rights reserved.
    </Typography>
  );
};

export default Footer;
