import { Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeBackground from "../../images/recipeBackgound.jpg";
import Recipe from "./Recipe/Recipe";
import CookDetails from "./CookDetails/CookDetails";
import { useSelector } from "react-redux";

const RecipeDetails = (props) => {
  // state for recipe
  const [recipe, setResipe] = useState({});
  // state for cook details
  const [cook, setCook] = useState({});
  // state for user(cook),data of user if user is logged-in
  const user = useSelector((state) => state.user.value);
  // initial fetch  recipe from database and set clenup function for fetching
  useEffect(() => {
    let mounted = true;

    if (props.match.params.id && mounted) {
      axios
        .get(
          `${process.env.REACT_APP_RECIPES_RECIPE_BY_ID}/${props.match.params.id}`
        )
        .then((res) => res.status === 200 && setResipe(res.data))
        .catch((error) => alert(error.message));
    }

    return function cleanup() {
      mounted = false;
    };
  }, [props]);

  // initial fetch cook owner of recipe from database and set clenup function for fetching
  useEffect(() => {
    let mounted = true;
    if (recipe.cook_id && mounted) {
      axios
        .get(`${process.env.REACT_APP_COOK_BASE}/${recipe.cook_id}`)
        .then((res) => res.status === 200 && setCook(res.data))
        .catch((error) => alert(error.message));
    }
    return function cleanup() {
      mounted = false;
    };
  }, [recipe]);

  // css style for laoding text
  const loadingLetters = {
    color: "#fff",
    alignSelf: "center ",
    animation: "qw 3s infinite ",
    "@keyframes qw": {
      from: { color: "#fff" },
      to: { color: "red" },
    },
    "@media (max-width: 900px)": {
      minHeight: "80vh",
      lineHeight: "80vh",
    },
  };

  // css for recipe conteiner
  const conteiner = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundImage: `url(${RecipeBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  };

  return (
    <Grid item sx={conteiner} xs={12} sm={12} md={10} lg={10} xl={10}>
      {Object.keys(recipe).length > 0 ? (
        <>
          <Grid
            item
            xs={12}
            sm={12}
            md={7}
            lg={7}
            xl={7}
            sx={{ padding: "1rem" }}
          >
            <Recipe recipe={recipe} />
          </Grid>
          {Object.keys(user).length !== 0 && (
            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              lg={5}
              xl={5}
              sx={{ padding: "1rem" }}
            >
              <CookDetails cook={cook} date={recipe.createdAt} />
            </Grid>
          )}
        </>
      ) : (
        <Typography variant="h3" sx={loadingLetters}>
          Loading ...
        </Typography>
      )}
    </Grid>
  );
};

export default RecipeDetails;
