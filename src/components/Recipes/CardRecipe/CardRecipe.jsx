import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShareIcon from "@mui/icons-material/Share";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CardRecipe = ({ recipe }) => {
  // css style for card
  const cardCon = {
    maxWidth: 320,
    margin: "1rem",
    boxShadow: "9px 14px 8px 5px #0000004a",
    border: "solid 1px #0000002b",
    backgroundColor: "#ffffff7d",
    transition: "all 1s",
    "&:hover": {
      boxShadow: "3px 5px 5px 3px #0000004a",
      border: "solid 2px #0000006b",
      transform: "scale(1.075)",
    },
  };

  return (
    <Card sx={cardCon}>
      <CardHeader
        avatar={
          <Tooltip title="Number of ingredients">
            <Avatar sx={{ backgroundColor: "#f44336" }} aria-label="recipe">
              {recipe.food_ingredients.length}
            </Avatar>
          </Tooltip>
        }
        title={recipe.meal_name}
        subheader={"Preparation time: " + recipe.preparation_time + " min."}
      />
      <CardMedia
        component="img"
        height="200"
        image={recipe.image_meal}
        alt={recipe.meal_name}
      />
      <CardContent>
        <Typography noWrap variant="body2" color="text.secondary">
          {recipe.cooking}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Tooltip title="Love recipe">
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share recipe">
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="See recipe">
          <IconButton
            aria-label="share"
            component={Link}
            to={`/Recipes/RecipeDetails/${recipe._id}`}
          >
            <MenuBookIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default CardRecipe;
