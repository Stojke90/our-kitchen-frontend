import { Alert, Box, easing, Grid, Slide, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import SkeletonLoader from "../../SkeletonLoader/SkeletonLoader";
import CardRecipe from "./CardRecipe/CardRecipe";
import { conForCards, gridCon, searchCon, searcInput } from "./style";

const AllRecipes = (props) => {
  // props for all recipe component
  const { children, value, index, ...other } = props;
  // state for user(cook),data of user if user is logged-in
  const user = useSelector((state) => state.user.value);
  // state for all user recipes
  const [userRecipes, setUserRecipes] = useState({});
  //state for search input value
  const [searchValue, setSearchValue] = useState("");
  // state for open and close alert message for successfully save recipe changes
  const [open, setOpen] = useState(false);

  // fun for set state for open and close alert message for successfully save recipe changes
  const showMessage = (value) => setOpen(value);

  // fun for change data of recipe find by index,local change in state,better perfomanse
  const changeArrayWithOneRecipe = (data, i) => (userRecipes[i] = data);

  // fun to discard a deleted recipe from state
  const setNewStateWithRecipes = (id) =>
    setUserRecipes(userRecipes.filter((recipe) => recipe._id !== id));

  // convert date to milliseconds
  const convertDate = (re) => {
    let date = new Date(re.createdAt);
    var milliseconds = date.getTime();
    return milliseconds;
  };

  // inital fetch all user recipes and set clenup function for fetching
  useEffect(() => {
    let mounted = true;
    mounted &&
      user._id &&
      value === 0 &&
      axios
        .post(process.env.REACT_APP_RECIPES_USER_RECIPES, { id: user._id })
        .then((res) => res.status === 200 && setUserRecipes(res.data))
        .catch((error) => alert(error.message));

    return function cleanup() {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={gridCon}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={searchCon}>
              <TextField
                type="text"
                variant="filled"
                label="Search recipe"
                sx={searcInput}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={conForCards}>
              {userRecipes.length > 0 ? (
                userRecipes
                  .sort((a, b) => convertDate(b) - convertDate(a))
                  .map((recipe, index) => (
                    <CardRecipe
                      key={uuidv4()}
                      recipe={recipe}
                      index={index}
                      showMessage={showMessage}
                      setNewStateWithRecipes={setNewStateWithRecipes}
                      changeArrayWithOneRecipe={changeArrayWithOneRecipe}
                    />
                  ))
                  .filter(
                    (res) =>
                      res.props.recipe.meal_name
                        .toUpperCase()
                        .indexOf(searchValue.toUpperCase()) > -1
                  )
              ) : (
                <SkeletonLoader />
              )}
            </Grid>

            <Slide
              direction="left"
              in={open}
              timeout={800}
              easing={{ enter: easing.easeOut, exit: easing.sharp }}
              mountOnEnter
              unmountOnExit
              sx={{ position: "fixed", right: "5px", bottom: "50px" }}
            >
              <Alert severity="success">
                Successfully save recipe changes.
              </Alert>
            </Slide>
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default AllRecipes;
