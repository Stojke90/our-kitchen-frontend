import { createTheme, Grid, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import LinksName from "../LinksName/LinksName";
import useStyles from "./style";

const NavBar = () => {
  // css styles
  const classes = useStyles();
  // responsive font
  const theme = createTheme();

  theme.typography.h2 = {
    fontSize: "4rem",

    [theme.breakpoints.down("md")]: {
      fontSize: "3rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem",
    },
    "@media (max-width: 370px)": {
      fontSize: "1.8rem",
    },
  };

  return (
    <Grid
      container
      justifyContent="space-evenly"
      alignItems="center"
      direction="column"
      className={classes.navCon}
    >
      <Grid item>
        <ThemeProvider theme={theme}>
          <Typography
            variant="h2"
            mr={12}
            mb={1}
            className={classes.text_from_left}
          >
            Welcome chefs to
          </Typography>
          <Typography variant="h2" className={classes.text_from_right}>
            ...our kitchen
          </Typography>
        </ThemeProvider>
      </Grid>

      <LinksName />
    </Grid>
  );
};

export default NavBar;
