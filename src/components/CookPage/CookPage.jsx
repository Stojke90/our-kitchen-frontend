import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  gridCon,
  cardCon,
  cookDetails,
  cookName,
  textShadow,
  spanData,
  cardAction,
  recipesListCon,
  skeletonLoader,
} from "./style";

const CookPage = () => {
  // from react-roter,use to find cook id
  const data = useLocation();
  // state for cook data
  const [cook, setCook] = useState({});
  // state for cooks recipes
  const [cookRecipes, setCookRecipes] = useState([]);
  // state for expand card and load all cook's recipes
  const [expanded, setExpanded] = useState(false);
  // state for number of cook recipes
  const [numberRecipe, setNumberRecipe] = useState(0);

  // fun for open all cook's recipes and close,expand and close
  const handleExpandClick = () => setExpanded(!expanded);

  // initial fetch cook owner of recipe from database and set clenup function for fetching
  useEffect(() => {
    let mounted = true;
    let cookId = data.pathname.split("/")[3];
    cookId &&
      mounted &&
      axios
        .get(`${process.env.REACT_APP_COOK_BASE}/${cookId}`)
        .then((res) => res.status === 200 && setCook(res.data))
        .catch((error) => alert(error.message));

    return function cleanup() {
      mounted = false;
    };
  }, [data]);

  // fun for get number of cook recipes
  useEffect(() => {
    axios
      .post(process.env.REACT_APP_RECIPES_NUMBER_COOK_RECIPES, { id: cook._id })
      .then((res) => setNumberRecipe(res.data))
      .catch((error) => alert(error.message));
  }, [cook]);

  // on expand card fetch all cook recipes,fetc recipes only if state for cook recipes is empthy,and cleanup function
  useEffect(() => {
    let mounted = true;
    let id = cook._id;

    if (expanded && cook._id && mounted && !cookRecipes.length) {
      return axios
        .post(process.env.REACT_APP_RECIPES_COOK_RECIPE_FILTER_DATA, { id })
        .then((res) => res.status === 200 && setCookRecipes(res.data))
        .catch((error) => alert(error.message));
    }

    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  // convert date to milliseconds
  const convertDate = (re) => {
    let date = new Date(re.createdAt);
    var milliseconds = date.getTime();
    return milliseconds;
  };

  return (
    <Grid item xs={12} sm={12} md={10} lg={10} xl={10} sx={gridCon}>
      {Object.keys(cook).length > 0 ? (
        <Card sx={cardCon}>
          <Typography
            gutterBottom
            align="center"
            variant="h4"
            m={1}
            color="#ff4500"
            component="div"
            sx={cookName}
          >
            {cook.cook_name}
          </Typography>
          <CardMedia
            component="img"
            height="300"
            image={cook.image}
            alt={cook.cook_name + " photo"}
            sx={cookDetails}
          />
          <CardContent sx={cookDetails}>
            <Typography
              color="#0480ff"
              sx={textShadow}
              gutterBottom
              variant="h5"
              component="div"
            >
              <span style={spanData}>Full Name: </span>
              {cook.first_name + " " + cook.last_name}
            </Typography>

            <Typography
              color="#0480ff"
              sx={textShadow}
              gutterBottom
              variant="h5"
              component="div"
            >
              <span style={spanData}>Birth: </span>
              {cook.birth.split("-").reverse().join("/")}
            </Typography>

            <Typography
              color="#0480ff"
              sx={textShadow}
              gutterBottom
              variant="h5"
              component="div"
            >
              <span style={spanData}>Member since: </span>
              {cook.date.slice(0, 10).split("-").reverse().join("/")}
            </Typography>

            <Typography
              color="#0480ff"
              sx={textShadow}
              gutterBottom
              variant="h5"
              component="div"
            >
              <span style={spanData}>Number of Recipes: </span>
              {numberRecipe}
            </Typography>
          </CardContent>
          <CardActions sx={cardAction}>
            <Button
              variant="contained"
              startIcon={
                <KeyboardArrowDownIcon
                  sx={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              }
              endIcon={
                <KeyboardArrowDownIcon
                  sx={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              }
              onClick={handleExpandClick}
            >
              {expanded ? "Hide Recipes" : "Show Recipes"}
            </Button>
          </CardActions>
          <Collapse
            sx={{ width: "100%" }}
            in={expanded}
            timeout="auto"
            unmountOnExit
          >
            <CardContent>
              <Stack>
                {cookRecipes.length > 0 &&
                  cookRecipes
                    .sort((a, b) => convertDate(b) - convertDate(a))
                    .map((recipe) => (
                      <Typography
                        sx={recipesListCon}
                        key={uuidv4()}
                        component={Link}
                        to={`/Recipes/RecipeDetails/${recipe._id}`}
                      >
                        <span style={{ width: "50%", textAlign: "left" }}>
                          {recipe.meal_name}
                        </span>
                        <span style={{ width: "50%", textAlign: "right" }}>
                          {recipe.createdAt
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("/")}
                        </span>
                      </Typography>
                    ))}

                {cookRecipes.length === 0 &&
                  !expanded &&
                  [1, 2, 3].map((item) => (
                    <Skeleton key={uuidv4()} variant="text" height={20} />
                  ))}

                {cookRecipes.length === 0 && expanded && (
                  <Typography align="left" variant="h5">
                    The chef has no recipes
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Collapse>
        </Card>
      ) : (
        <Skeleton variant="rectangular" sx={skeletonLoader} />
      )}
    </Grid>
  );
};

export default CookPage;
