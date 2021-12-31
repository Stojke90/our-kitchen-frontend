import { Skeleton, Stack } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const SkeletonLoader = () => {
  // use location from react router for checking the route
  const location = useLocation();
  const foodPath =
    location.pathname === "/Food gallery" || location.pathname === "/UserPage";
  const RecipePath = location.pathname === "/Recipes";

  const imgLoader = {
    backgroundColor: "#00000080",
    borderRadius: "1rem",
    "&::after": {
      background: `linear-gradient(
        90deg, #d51a1a94, rgb(41 90 163 / 62%), #bace13ad)!important`,
      borderRadius: "20%",
    },
  };

  const textLoader = {
    backgroundColor: "#00000080",
    borderRadius: "0.5rem",
    "&::after": {
      background: `linear-gradient(
        90deg, #d51a1a94, rgb(41 90 163 / 62%), #bace13ad)!important`,
      borderRadius: "20%",
    },
  };
  const imgLoaderRecipes = {
    backgroundColor: "#00000080",
    borderRadius: "1rem",
    "&::after": {
      background: `linear-gradient( 90deg, #309ce352, rgb(232 83 23 / 37%), #fbfbfb54)!important`,
      borderRadius: "20%",
    },
  };
  const textLoaderRecipes = {
    backgroundColor: "#00000080",
    borderRadius: "0.5rem",
    "&::after": {
      background: `linear-gradient( 90deg, #309ce352, rgb(232 83 23 / 37%), #fbfbfb54)!important`,
      borderRadius: "20%",
    },
  };
  return [1, 2, 3, 4, 5, 6].map((item) => {
    return (
      <Stack sx={{ margin: "1rem" }} key={uuidv4()} spacing={1}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={300}
          height={300}
          sx={
            foodPath
              ? imgLoader
              : RecipePath
              ? imgLoaderRecipes
              : { borderRadius: "1rem" }
          }
        />
        <Skeleton
          animation="wave"
          variant="text"
          height={45}
          sx={
            foodPath
              ? textLoader
              : RecipePath
              ? textLoaderRecipes
              : { borderRadius: "0.5rem" }
          }
        />
      </Stack>
    );
  });
};

export default SkeletonLoader;
