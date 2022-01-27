import CommentIcon from "@mui/icons-material/Comment";
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const ListUsers = ({ users, title, userDataOpenModal }) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} p={2}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          margin: "auto",
        }}
        subheader={<li />}
      >
        <ListSubheader>
          {title} {users.length}
        </ListSubheader>
        <Divider />
        {users.length > 0 ? (
          users.map((data) => (
            <ListItem
              key={uuidv4()}
              secondaryAction={
                <Tooltip title="View Cook">
                  <IconButton onClick={() => userDataOpenModal(data)}>
                    <CommentIcon
                      sx={{
                        color:
                          title === "Registered users:" ? "#deb887" : "#000",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              }
              sx={{
                backgroundColor: "transparent",
                cursor: "pointer",
                transition: "all 1s",
                ":hover": { backgroundColor: "#a9a9a929" },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={data.first_name + " " + data.last_name}
                  src={data.image}
                />
              </ListItemAvatar>
              <ListItemText primary={data.first_name + " " + data.last_name} />
            </ListItem>
          ))
        ) : (
          <Typography align="center">
            {title === "Registered users:"
              ? "No existing users."
              : "No users are waiting to be received."}
          </Typography>
        )}
      </List>
    </Grid>
  );
};

export default ListUsers;
