import {
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import InfoIcon from "@mui/icons-material/Info";
import { galeryCon, imageCon, ulForImages, textCon, loaderCon } from "./style";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const FoodGalery = () => {
  const theme = useTheme();
  //state for food img with base data
  const [foodImg, setFoodImg] = useState([]);

  // inital fetch data with recipe images,and cleanup function
  useEffect(() => {
    let mounted = true;
    mounted &&
      axios
        .get(process.env.REACT_APP_RECIPES_FOOD_GALERY)
        .then((res) => res.status === 200 && setFoodImg(res.data))
        .catch((error) => alert(error.message));
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <Grid item xs={12} sm={12} md={10} lg={10} xl={10} sx={galeryCon}>
      <Grid sx={imageCon}>
        {foodImg.length !== 0 ? (
          <ImageList sx={ulForImages(theme)}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div" sx={textCon}>
                Food Galery
              </ListSubheader>
            </ImageListItem>
            {foodImg &&
              foodImg.map((item) => (
                <ImageListItem key={uuidv4()}>
                  <img
                    src={`${item.image_meal}`}
                    srcSet={`${item.image_meal}`}
                    alt={item.meal_name}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.meal_name}
                    subtitle={"by: " + item.cook_name}
                    actionIcon={
                      <Tooltip title="See recipe">
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${item.cook_name}`}
                          component={Link}
                          to={`/Recipes/RecipeDetails/${item.recipe_id}`}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  />
                </ImageListItem>
              ))}
          </ImageList>
        ) : (
          <Grid item sx={loaderCon}>
            <SkeletonLoader />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default FoodGalery;
