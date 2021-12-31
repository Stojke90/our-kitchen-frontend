import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Grid,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { openModal } from "../../features/modal";
import { login, logout } from "../../features/user";
import AvatarCook from "../../images/cookAvatar.jpg";
import LogOrSignModal from "./LogOrSignModal/LogOrSignModal";
import { animeEntry, SvgButton, useStyles } from "./style";

const LinksName = () => {
  // css styles
  const classes = useStyles();
  // use history from react-router-dom to go on other route if user is log in
  const history = useHistory();
  // for view location of route
  const location = useLocation();
  // redux
  const dispatch = useDispatch();
  // state for user(cook),data of user if user is logged-in
  const user = useSelector((state) => state.user.value);

  // state for open menu with link names
  const [anchorLinks, setAnchorLinks] = useState(null);
  //state for user menu open and close
  const [anchorElUser, setAnchorElUser] = useState(null);

  // open menu bar with link name
  const openLinkMenu = Boolean(anchorLinks);

  // check if object is empthy
  const check = (obj) => Object.keys(obj).length !== 0;

  // const if not main route
  const notMainRoute = location.pathname !== "/";
  // const for main route
  const mainRoute = location.pathname === "/";

  // name of links,routes
  const linksRoutes = ["Recipes", "Our cooks", "Food gallery", "About"];

  // if the user exists or if the path is not initial
  const question = check(user) || notMainRoute;

  // open menu with links name
  const handleClickOpenLinkMenu = (e) => setAnchorLinks(e.currentTarget);
  // close menu with menu links
  const handleCloseLinks = () => setAnchorLinks(null);
  // open profil menu
  const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);
  // close profil menu
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // logging out of user(cook's)
  const loggingOut = () => {
    dispatch(logout());
    sessionStorage.removeItem("User");
    history.push("/");
  };

  // set data of the logged-in user in session storage,so that when the page is refreshed,the data is not lost
  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("User"));
    if (data !== null && data !== undefined)
      return !check(user) && dispatch(login(data));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Grid
        item
        xs={mainRoute ? 3 : 12}
        sm={mainRoute ? 3 : 12}
        md={2}
        lg={2}
        xl={2}
        className={question ? classes.user_background : classes.nothing}
      >
        <Hidden mdDown={notMainRoute}>
          {notMainRoute && (
            <Grid
              className={classes.cook_image}
              sx={{ marginBottom: check(user) ? 0 : "1rem" }}
            >
              <img
                style={{ width: "100%" }}
                src={check(user) ? user.image : AvatarCook}
                alt="cook"
              />
            </Grid>
          )}

          {check(user) && (
            <Link
              to={user.role === 2 ? "/AdminPage" : "/UserPage"}
              style={{ margin: "1rem auto" }}
            >
              <SvgButton>Profile</SvgButton>
            </Link>
          )}

          {linksRoutes.map((text, i) => (
            <Typography
              key={uuidv4()}
              gutterBottom
              variant="h4"
              component={Link}
              to={`/${text}`}
              sx={{
                backgroundColor:
                  location.pathname === `/${text}` ? "#292828" : "none",
                borderRadius: location.pathname === `/${text}` ? "7px" : "none",
              }}
              className={mainRoute ? animeEntry(i, classes) : classes.stil}
            >
              {text}
            </Typography>
          ))}

          <Typography
            variant="h4"
            className={
              mainRoute ? `${classes.links} ${classes.anime3}` : classes.stil
            }
            onClick={() =>
              check(user) ? loggingOut() : dispatch(openModal(true))
            }
          >
            {check(user) ? "Logout" : "Log/Sign in"}
          </Typography>

          <LogOrSignModal />
        </Hidden>
        {/* mobil version */}
        <Hidden mdUp={notMainRoute}>
          {notMainRoute && (
            <Box sx={{ flexGrow: 1 }}>
              <AppBar
                sx={{
                  background: "linear-gradient(86deg, black, transparent)",
                }}
                position="static"
              >
                <Toolbar
                  variant="regular"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Tooltip title="Open pages">
                    <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                      onClick={handleClickOpenLinkMenu}
                    >
                      <MenuIcon size="large" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorLinks}
                    open={openLinkMenu}
                    onClose={handleCloseLinks}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {linksRoutes.map((link) => (
                      <MenuItem
                        key={uuidv4()}
                        component={Link}
                        to={`/${link}`}
                        onClick={() => handleCloseLinks()}
                        sx={{
                          backgroundColor:
                            location.pathname === `/${link}`
                              ? "#0000000d"
                              : "fff",
                        }}
                      >
                        {link}
                      </MenuItem>
                    ))}
                  </Menu>

                  <img
                    src="logo1.png"
                    alt="logo"
                    style={{ margin: "0.5rem", width: "4rem" }}
                  />

                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip
                      title={check(user) ? "Open settings" : "Log/Sign in"}
                    >
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={check(user) ? user.cook_name : "User Image"}
                          src={check(user) ? user.image : AvatarCook}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {check(user) && (
                        <MenuItem
                          component={Link}
                          to={user.role === 2 ? "/AdminPage" : "/UserPage"}
                          onClick={handleCloseUserMenu}
                        >
                          Profile
                        </MenuItem>
                      )}

                      <MenuItem
                        onClick={() => {
                          check(user)
                            ? loggingOut()
                            : dispatch(openModal(true));
                          handleCloseUserMenu();
                        }}
                      >
                        {check(user) ? "Logout" : "Log/Sign in"}
                      </MenuItem>
                    </Menu>
                  </Box>
                </Toolbar>
              </AppBar>
            </Box>
          )}
          <LogOrSignModal />
        </Hidden>
      </Grid>
    </>
  );
};

export default LinksName;
