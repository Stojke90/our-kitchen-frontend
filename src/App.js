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
  Footer,
  ScrollToTop,
  ErrorPage,
} from "./importComponents";
import { useLocation } from "react-router";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

const App = () => {
  // use location from react router for checking the route
  const location = useLocation();
  // state for user(cook),data of user if user is logged-in
  const user = useSelector((state) => state.user.value);

  return (
    <>
      <Grid container>
        <ScrollToTop />
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
          <Route exact path="*" component={ErrorPage} />
        </Switch>

        {location.pathname !== "/" && <Footer />}
      </Grid>
    </>
  );
};

export default App;
