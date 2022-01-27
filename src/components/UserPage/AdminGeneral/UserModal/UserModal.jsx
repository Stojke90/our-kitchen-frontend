import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, CardActions, CardContent } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserModal = ({
  handleClose,
  open,
  userData,
  removeFromState,
  addFromState,
}) => {
  // fun for delted user or decline cook
  const deleteUser = (id) => {
    axios
      .delete(`${process.env.REACT_APP_COOK_DELETE_COOK}${id}`)
      .then((res) => {
        if (res.status === 200) {
          removeFromState(res.data);
          handleClose();
        }
      })
      .catch((error) => alert(error));
  };

  // approve user to be cook
  const approved = (data) => {
    axios
      .patch(process.env.REACT_APP_COOK_APPROVED, { data })
      .then((res) => {
        if (res.status === 200) {
          addFromState(res.data);
          handleClose();
        }
      })
      .catch((error) => alert(error));
  };
  return (
    Object.keys(userData).length > 0 && (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <img
            style={{ width: "100%" }}
            src={userData.image}
            alt={userData.first_name + " " + userData.last_name}
          />
          <CardContent>
            <Typography paragraph color="initial" variant="subtitle1">
              <strong>Full name:</strong>{" "}
              {userData.first_name + " " + userData.last_name}
            </Typography>
            <Typography paragraph color="initial" variant="subtitle1">
              <strong>Cook name:</strong> {userData.cook_name}
            </Typography>
            <Typography paragraph color="initial" variant="subtitle1">
              <strong>Email:</strong> {userData.email}
            </Typography>
            <Typography paragraph color="initial" variant="subtitle1">
              <strong>Birth:</strong> {userData.birth}
            </Typography>
          </CardContent>

          <CardActions>
            {userData.role === 0 && (
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={() => approved(userData)}
              >
                Approved
              </Button>
            )}
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={() => deleteUser(userData._id)}
            >
              {userData.role === 0 ? "Decline" : "Delete"}
            </Button>
          </CardActions>
        </Box>
      </Modal>
    )
  );
};

export default UserModal;
