import { Grid, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { withRouter } from "react-router";
import AllRecipes from "./AllRecipes/AllRecipes";
import NewRecipe from "./NewRecipe/NewRecipe";
import { boxCon, gridCon, tabPanel, a11yProps } from "./style";

const UserPage = () => {
  /// state for switch beetwen tab panel,components
  const [value, setValue] = useState(0);

  // fun for change component in tab panel
  const handleChange = (e, newValue) => setValue(newValue);

  return (
    <Grid item xs={12} sm={12} md={10} lg={10} xl={10} sx={gridCon}>
      <Box sx={boxCon}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab sx={tabPanel} label="My recipes" {...a11yProps(0)} />
          <Tab sx={tabPanel} label="New recipe" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <AllRecipes value={value} index={0} />
      <NewRecipe value={value} index={1} />
    </Grid>
  );
};

export default withRouter(UserPage);
