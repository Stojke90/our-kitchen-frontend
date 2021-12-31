import { Grid, Pagination, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import CooksCard from "./CooksCard/CooksCard";
import {
  cardCon,
  input,
  inputCon,
  noCook,
  ourCooks,
  pagination,
  componentCon,
} from "./style";

const OurCooks = () => {
  // state for all our cook's
  const [cooks, setCooks] = useState([]);
  // state for show text if cook dont exist
  const [showText, setShowText] = useState(false);
  // state for pagination
  const [page, setPage] = useState(1);
  // state for set 12 cook's per page per pagination number
  const [cooksPerPage, setCooksPerPage] = useState({ start: 0, end: 12 });

  const [cookName, setCookName] = useState("");

  // initial fetch all cook and set clenup function for fetching
  useEffect(() => {
    let mounted = true;

    mounted &&
      axios
        .get(process.env.REACT_APP_COOK_GALERY)
        .then((res) => {
          res.status === 200 && setCooks(res.data);
        })
        .catch((error) => alert(error.message));

    return function cleanup() {
      mounted = false;
    };
  }, []);

  // if movbile version set 8 if desktop 12 cook per page
  useEffect(() => {
    setCooksPerPage({
      start: 0,
      end: window.innerWidth < 607 ? 8 : 12,
    });
  }, []);

  // when page number change laoder another cook's,by order
  useEffect(() => {
    window.innerWidth < 607
      ? setCooksPerPage({
          start: page * 8 - 8,
          end: page * 8,
        })
      : setCooksPerPage({
          start: page * 12 - 12,
          end: page * 12,
        });
  }, [page]);

  // if search has no result return text no result
  useEffect(() => {
    cookName !== "" &&
    cooks.filter(
      (name) =>
        name.cook_name.toUpperCase().indexOf(cookName.toUpperCase()) > -1
    ).length === 0
      ? setShowText(true)
      : setShowText(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookName]);

  // fun for how many cards depending on the width of the screen
  const numberOfCards = () =>
    window.innerWidth < 607
      ? Math.ceil(cooks.length / 8)
      : Math.ceil(cooks.length / 12);

  return (
    <Grid item xs={12} sm={12} md={10} lg={10} xl={10} sx={componentCon}>
      <Typography variant="h1" align="center" sx={ourCooks}>
        Our Cook's
      </Typography>
      <Grid sx={inputCon}>
        <TextField
          hiddenLabel
          type="text"
          defaultValue=""
          variant="filled"
          size="small"
          placeholder="Search Cook by name...."
          color="error"
          onChange={(e) => setCookName(e.target.value)}
          sx={input}
        />
      </Grid>

      <Grid sx={cardCon}>
        {cooks.length === 0 ? (
          <SkeletonLoader />
        ) : (
          cooks
            .map((cook) => <CooksCard key={uuidv4()} cook={cook} />)
            .filter(
              (name) =>
                name.props.cook.cook_name
                  .toUpperCase()
                  .indexOf(cookName.toUpperCase()) > -1
            )
            .slice(cooksPerPage.start, cooksPerPage.end)
        )}

        {showText === true && (
          <Typography gutterBottom variant="subtitle1" sx={noCook}>
            There is no chef under this name!!!
          </Typography>
        )}
      </Grid>

      {cooks.length > (window.innerWidth < 607 ? 8 : 12) && (
        <Pagination
          count={numberOfCards()}
          page={page}
          variant="outlined"
          color="primary"
          sx={pagination}
          size="large"
          onChange={(e, newPage) => setPage(newPage)}
        />
      )}
    </Grid>
  );
};

export default OurCooks;
