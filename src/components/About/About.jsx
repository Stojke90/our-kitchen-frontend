import { Grid, Typography } from "@mui/material";
import React from "react";
import { aboutUs, termsOfUse, privacyPolicy } from "./dataText";
import { v4 as uuidv4 } from "uuid";
import { gridCon, centerMargin, title, textList } from "./style";

const About = () => {
  return (
    <Grid item xs={12} sm={12} md={10} lg={10} xl={10} sx={gridCon}>
      <Grid item xs={11} sm={11} md={11} lg={11} xl={11} sx={centerMargin}>
        <Typography variant="h3" sx={title}>
          About us
        </Typography>
        {aboutUs.map((text) => (
          <Typography key={uuidv4()} sx={textList} paragraph>
            {text}
          </Typography>
        ))}
      </Grid>
      <Grid item xs={11} sm={11} md={11} lg={11} xl={11} sx={centerMargin}>
        <Typography variant="h3" sx={title}>
          Terms of use
        </Typography>
        {termsOfUse.map((text) => (
          <Typography key={uuidv4()} paragraph sx={textList}>
            {text}
          </Typography>
        ))}
      </Grid>

      <Grid item xs={11} sm={11} md={11} lg={11} xl={11} sx={centerMargin}>
        <Typography variant="h3" sx={title}>
          Privacy Policy
        </Typography>
        {privacyPolicy.map((text) => (
          <Typography key={uuidv4()} paragraph sx={textList}>
            {text}
          </Typography>
        ))}
      </Grid>
    </Grid>
  );
};

export default About;
