import { Button, Grid, Pagination, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import CardRecipe from "./CardRecipe/CardRecipe";
import {
  recipesCon,
  text1,
  text2,
  inputCon,
  inputStyle,
  mainCardCom,
  paginationStyle,
} from "./style";

const Recipes = () => {
  // state for all recipes from database
  const [allRecipes, setAllRecipes] = useState([]);
  // state for search inputs
  const [search, setSearch] = useState({ recipe: "", cook: "" });
  // useRef for start value
  const recipes = useRef([]);
  // state for pagination
  const [page, setPage] = useState(1);
  // state for set 12 recipe per page per pagination number
  const [recipePerPage, setRecipePerPage] = useState({});

  useEffect(() => {
    setRecipePerPage({
      start: 0,
      end: window.innerWidth < 607 ? 8 : 12,
    });
  }, []);

  // initial fetch all recipes from database and set clenup function for fetching
  useEffect(() => {
    let mounted = true;
    axios
      .get(process.env.REACT_APP_RECIPES_BASE)
      .then((res) => {
        if (mounted && res.status === 200) {
          setAllRecipes(res.data);
          recipes.current = res.data;
        }
      })
      .catch((error) => alert(error.message));

    return function cleanup() {
      mounted = false;
    };
  }, []);

  // fun for filter search by recipe name
  const searchRecipeByName = (e) => {
    setSearch({ ...search, recipe: e.target.value });
    e.target.value.length >= 3
      ? setAllRecipes(
          allRecipes.filter(
            (name) =>
              name.meal_name
                .toUpperCase()
                .indexOf(e.target.value.toUpperCase()) > -1
          )
        )
      : setAllRecipes(recipes.current);
  };

  // fun for filter search by cook name recipes
  const searchRecipeByCookName = (e) => {
    setSearch({ ...search, cook: e.target.value });
    e.target.value.length >= 3
      ? setAllRecipes(
          allRecipes.filter(
            (name) =>
              name.cook_name
                .toUpperCase()
                .indexOf(e.target.value.toUpperCase()) > -1
          )
        )
      : setAllRecipes(recipes.current);
  };

  // fun for reset search fields
  const resetSearch = () => {
    setAllRecipes(recipes.current);
    setSearch({ recipe: "", cook: "" });
  };

  // fun for change button style
  const buttonLook = () =>
    search.recipe || search.cook ? "contained" : "outlined";

  // when page number change laoder another recipes,by order
  // if mobile device laod 8 recipe per page if not 12 recipe load
  useEffect(() => {
    window.innerWidth < 607
      ? setRecipePerPage({
          start: page * 8 - 8,
          end: page * 8,
        })
      : setRecipePerPage({
          start: page * 12 - 12,
          end: page * 12,
        });
  }, [page]);

  // fun for handle page number and scroll to top of page
  const handleClickPagination = (e, newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: window.innerWidth < 607 ? 200 : 0,
      behavior: "smooth",
    });
  };

  // fun for how many cards depending on the width of the screen
  const numberOfCards = () =>
    window.innerWidth < 607
      ? Math.ceil(allRecipes.length / 8)
      : Math.ceil(allRecipes.length / 12);

  return (
    <Grid item xs={12} sm={12} md={10} lg={10} xl={10} sx={recipesCon}>
      <Typography variant="h3" align="center" m={0.5} p={1} sx={text1}>
        Welcome to our book with delicious recipes
      </Typography>
      <Typography variant="subtitle1" align="center" sx={text2}>
        Here you can find some of the most delicious dishes for your favorite
        meals during the day
      </Typography>
      <Grid item sx={inputCon}>
        <TextField
          sx={inputStyle}
          type="text"
          value={search.recipe}
          label="Search recipe by name"
          onChange={(e) => searchRecipeByName(e)}
        />
        <TextField
          sx={inputStyle}
          type="text"
          value={search.cook}
          label="Search recipe by cook name"
          onChange={(e) => searchRecipeByCookName(e)}
        />
        <Button
          sx={{ m: 1 }}
          variant={buttonLook()}
          size="large"
          onClick={() => resetSearch()}
        >
          Reset
        </Button>
      </Grid>

      <Grid item sx={mainCardCom}>
        {allRecipes.length > 0 ? (
          allRecipes
            .map((recipe) => <CardRecipe key={uuidv4()} recipe={recipe} />)
            .slice(recipePerPage.start, recipePerPage.end)
        ) : recipes.current.length !== 0 && allRecipes.length === 0 ? (
          <Typography
            align="center"
            variant="overline"
            sx={{ marginTop: "4rem", color: "#f0f8ff", fontSize: "1.2rem" }}
          >
            The requested recipe does not exist under this name.
          </Typography>
        ) : (
          <SkeletonLoader />
        )}
      </Grid>
      {allRecipes.length > (window.innerWidth < 607 ? 8 : 12) && (
        <Pagination
          count={numberOfCards()}
          page={page}
          variant="outlined"
          color="primary"
          sx={paginationStyle}
          size="large"
          onChange={handleClickPagination}
        />
      )}
    </Grid>
  );
};

export default Recipes;
