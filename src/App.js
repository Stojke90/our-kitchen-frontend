import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import {
  NavBar,
  LinksName,
  Recipes,
  OurCooks,
  FoodGallery,
  About,
  AdminPage,
  UserPage,
  ProtectedRoutes,
  ForbiddenRoute,
  RecipeDetails,
  CookPage,
} from "./importComponents";
import { useLocation } from "react-router";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const App = () => {
  // use location from react router for checking the route
  const location = useLocation();
  // state for user(cook),data of user if user is logged-in
  const user = useSelector((state) => state.user.value);
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
    <>
      <Grid container>
        {location.pathname === "/" ? <></> : <LinksName />}
        <Switch>
          <Route exact path="/" component={NavBar} />
          <Route exact path="/Recipes" component={Recipes} />
          <Route exact path="/Our Cooks" component={OurCooks} />
          <Route exact path="/Food Gallery" component={FoodGallery} />
          <Route exact path="/About" component={About} />
          <Route
            exact
            path="/Recipes/RecipeDetails/:id"
            component={RecipeDetails}
          />
          {user.role && (
            <ProtectedRoutes
              exact
              path="/Our Cooks/CookDetails/:id"
              component={CookPage}
            />
          )}
          {user.role === 2 && (
            <ProtectedRoutes exact path="/AdminPage" component={AdminPage} />
          )}
          {user.role === 1 && (
            <ProtectedRoutes exact path="/UserPage" component={UserPage} />
          )}
          <ForbiddenRoute
            exact
            path="/ForbiddenRoute"
            component={ForbiddenRoute}
          />
        </Switch>
        {location.pathname !== "/" && (
          <Typography
            p={2}
            align="center"
            variant="h5"
            component="div"
            sx={footerStyle}
          >
            Terms of use | Privacy Enviromental Policy Copyright © 2021{" "}
            {document.title} All rights reserved.
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default App;
