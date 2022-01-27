import { Grid, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import AllRecipes from "./AllRecipes/AllRecipes";
import NewRecipe from "./NewRecipe/NewRecipe";
import UserGeneral from "./UserGeneral/UserGeneral";
import { boxCon, gridCon, tabPanel, a11yProps } from "./style";
import AdminGeneral from "./AdminGeneral/AdminGeneral";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
const UserPage = () => {
  /// state for switch beetwen tab panel,components
  const [value, setValue] = useState(0);

  // fun for change component in tab panel
  const handleChange = (e, newValue) => setValue(newValue);

  // state for user(cook),data of user if user is logged-in
  const user = useSelector((state) => state.user.value);

  return (
    <>
      <ScrollToTop />
      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} sx={gridCon}>
        <Box sx={boxCon}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab sx={tabPanel} label="My recipes" {...a11yProps(0)} />
            <Tab sx={tabPanel} label="New recipe" {...a11yProps(1)} />
            {user.role === 1 && (
              <Tab sx={tabPanel} label="General" {...a11yProps(2)} />
            )}
            {user.role === 2 && (
              <Tab sx={tabPanel} label="General" {...a11yProps(2)} />
            )}
          </Tabs>
        </Box>
        <AllRecipes value={value} index={0} />
        <NewRecipe value={value} index={1} />
        {user.role === 1 && <UserGeneral user={user} value={value} index={2} />}
        {user.role === 2 && <AdminGeneral value={value} index={2} />}
      </Grid>
    </>
  );
};

export default withRouter(UserPage);
