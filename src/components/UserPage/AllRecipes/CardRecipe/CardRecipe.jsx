import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import React, { useEffect, useState } from "react";
import EditForm from "./EditForm/EditForm";
import ModalDelete from "./ModalDelete/ModalDelete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { cardActionStyle, cardCon, cardTitle } from "./style";

const CardRecipe = ({
  recipe,
  setNewStateWithRecipes,
  changeArrayWithOneRecipe,
  index,
  showMessage,
}) => {
  // state for expande and close part of card
  const [expanded, setExpanded] = useState(false);
  // state for new food image
  const [newImage, setNewImage] = useState("");
  // change data in local in state,when recipe is edit
  // const [newEditRecipe, setNewEditRecipe] = useState({});
  // fun for expand and close
  const handleExpandClick = () => setExpanded(!expanded);
  // state for open and close modal for confirm delete or cancel delete recipe
  const [open, setOpen] = useState(false);
  // fun for set state for open modal
  const handleOpen = () => setOpen(true);
  // fin for set state for close modal
  const handleClose = () => setOpen(false);
  // fun for set new state for new food image
  const changeFoodImage = (image) => setNewImage(image);
  // fun for set state,for new recipe,chnage data in local
  // const changedRecipe = (editData) => setNewEditRecipe(editData);

  // initail when edit form close set state for new image on default state
  useEffect(() => {
    expanded === false && setNewImage("");
  }, [expanded]);

  return (
    <Card sx={cardCon}>
      <CardHeader
        // for later for rating
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        titleTypographyProps={cardTitle}
        title={recipe.meal_name}
        subheader={
          "Created: " +
          recipe.createdAt.slice(0, 10).split("-").reverse().join("/")
        }
      />
      <CardMedia
        component="img"
        height="200"
        image={newImage === "" ? recipe.image_meal : newImage}
        alt={recipe.meal_name + " photo"}
      />

      <CardActions sx={cardActionStyle}>
        <Button
          variant="contained"
          color="primary"
          endIcon={expanded ? <CancelIcon /> : <EditIcon />}
          onClick={handleExpandClick}
        >
          {expanded ? "Cancel" : "Edit"}
        </Button>
        <Button
          variant="contained"
          color="error"
          endIcon={<DeleteForeverIcon />}
          onClick={() => handleOpen()}
        >
          Delete
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <EditForm
            showMessage={showMessage}
            recipe={recipe}
            changeFoodImage={changeFoodImage}
            newImage={newImage}
            index={index}
            handleExpandClick={handleExpandClick}
            changeArrayWithOneRecipe={changeArrayWithOneRecipe}
          />
        </CardContent>
      </Collapse>
      <ModalDelete
        open={open}
        id={recipe._id}
        handleClose={handleClose}
        setNewStateWithRecipes={setNewStateWithRecipes}
      />
    </Card>
  );
};

export default CardRecipe;
