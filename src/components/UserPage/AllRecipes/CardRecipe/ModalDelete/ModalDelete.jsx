import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalDelete = ({ open, handleClose, id, setNewStateWithRecipes }) => {
  // fun for delete recipe
  const deleteRecipe = (id) => {
    axios
      .delete(`${process.env.REACT_APP_RECIPES_DELETE_RECIPE}${id}`)
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          setNewStateWithRecipes(res.data._id);
        }
      })
      .catch((error) => alert(error));
  };
  return (
    <>
      <Modal
        keepMounted
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Are you sure you want to delete the recipe?
            </Typography>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "1rem",
              }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteRecipe(id)}
              >
                Delete
              </Button>
              <Button variant="outlined" onClick={() => handleClose()}>
                Cancel
              </Button>
            </CardActions>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ModalDelete;
