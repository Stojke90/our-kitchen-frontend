import { Alert, Collapse, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ListUsers from "./ListUsers/ListUsers";
import UserModal from "./UserModal/UserModal";

const AdminGeneral = (props) => {
  // props for all recipe component
  const { children, value, index, ...other } = props;
  // state for users, registered and unregistered
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [unregisteredUsers, setUnregisteredUsers] = useState([]);
  // state for open modal of user details
  const [open, setOpen] = useState(false);
  // state for selected user data for modal
  const [userData, setUserData] = useState({});
  // state for open and close alert box
  const [openAlert, setOpenAlert] = useState(false);
  // state for allert message
  const [message, setMessage] = useState("");

  // initail fetch all user,registered and unregistered
  useEffect(() => {
    let mounted = true;

    value === 2 &&
      axios
        .get(process.env.REACT_APP_COOK_BASE)
        .then((res) => {
          if (mounted && res.status === 200) {
            setRegisteredUsers(res.data.filter((data) => data.role === 1));
            setUnregisteredUsers(res.data.filter((data) => data.role === 0));
          }
        })
        .catch((error) => alert(error.message));

    return function cleanup() {
      mounted = false;
    };
  }, [value]);

  // fun for open modal
  const handleOpen = () => setOpen(true);
  // fun for close modal
  const handleClose = () => setOpen(false);
  // fun for open modal and get data of selected user to pass data to modal
  const userDataOpenModal = (data) => {
    handleOpen();
    setUserData(data);
  };

  // fun for remove from state deleted cook(user)
  const removeFromState = (data) => {
    if (data.role === 0) {
      alertMessage("Successfully rejected candidate.");
      setUnregisteredUsers((prevState) =>
        prevState.filter((users) => users._id !== data._id)
      );
    } else if (data.role === 1) {
      alertMessage("Successfully deleted user.");
      setRegisteredUsers((prevState) =>
        prevState.filter((users) => users._id !== data._id)
      );
    }
  };

  // fun for add to state approved cook(user)
  const addFromState = (data) => {
    alertMessage("Successfully approved user.");
    setRegisteredUsers([...registeredUsers, data]);
    setUnregisteredUsers((prevState) =>
      prevState.filter((users) => users._id !== data._id)
    );
  };

  // fin for alert box
  const alertMessage = (title) => {
    setMessage(title);
    setOpenAlert(true);
    setTimeout(() => setOpenAlert(false), 2500);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index &&
        (registeredUsers.length > 0 || unregisteredUsers.length > 0 ? (
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <ListUsers
              users={registeredUsers}
              title={"Registered users:"}
              userDataOpenModal={userDataOpenModal}
            />
            <ListUsers
              users={unregisteredUsers}
              title={"Unregistered users:"}
              userDataOpenModal={userDataOpenModal}
            />
          </Box>
        ) : (
          <LinearProgress />
        ))}
      <UserModal
        handleClose={handleClose}
        open={open}
        userData={userData}
        removeFromState={removeFromState}
        addFromState={addFromState}
      />

      <Collapse
        in={openAlert}
        sx={{
          position: "fixed",
          width: "50%",
          bottom: "1rem",
          right: "1rem",
          zIndex: "999",
        }}
      >
        <Alert sx={{ mb: 2 }}>{message}</Alert>
      </Collapse>
    </div>
  );
};

export default AdminGeneral;
