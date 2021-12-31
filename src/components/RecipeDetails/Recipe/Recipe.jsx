import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import {
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
import { v4 as uuidv4 } from "uuid";
import {
  buttonCon,
  cardCon,
  cardHeader,
  listItems,
  preparationText,
} from "./style";

const Recipe = ({ recipe }) => {
  return (
    <>
      <Card sx={cardCon}>
        <CardHeader
          titleTypographyProps={{ fontSize: "2rem", color: "#ff4500" }}
          sx={cardHeader}
          // avatar={
          //   <Avatar aria-label="recipe">
          //     {recipe.food_ingredients.length} // rating for next update of app
          //   </Avatar>
          // }
          title={recipe.meal_name}
          subheader={"by: " + recipe.cook_name}
        />
        <CardMedia
          component="img"
          height="250"
          image={recipe.image_meal}
          alt={recipe.cook_name}
        />
        <CardContent>
          <Typography
            gutterBottom
            align="center"
            variant="h5"
            component="div"
            sx={{ backgroundColor: "#f0f8ff87", borderRadius: "8px" }}
          >
            Ingredients:
          </Typography>
          <ul style={{ marginLeft: "1rem" }}>
            {recipe.food_ingredients.map((ingredient) => (
              <li style={listItems} key={uuidv4()}>
                {ingredient.ingredient}
              </li>
            ))}
          </ul>
          <Typography
            gutterBottom
            align="center"
            mt={3}
            variant="h5"
            component="div"
            sx={{ backgroundColor: "#f0f8ff87", borderRadius: "8px" }}
          >
            Preparation:
          </Typography>
          {recipe.cooking.split(".").map((preparation) => (
            <Typography
              align="left"
              gutterBottom
              paragraph
              key={uuidv4()}
              sx={preparationText}
            >
              {preparation + "."}
            </Typography>
          ))}
        </CardContent>
        <CardActions sx={buttonCon}>
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
        </CardActions>
      </Card>
    </>
  );
};

export default Recipe;
