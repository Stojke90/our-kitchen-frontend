import { makeStyles } from "@mui/styles";
import navBarImage from "../../images/navbarbackground.webp";

const useStyles = makeStyles({
  navCon: {
    backgroundImage: `url(${navBarImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    overflow: "hidden",
    padding: "1rem",
  },
  text_from_left: {
    fontFamily: "'Dancing Script', cursive",
    position: "relative",
    color: "#ffa501",
    textShadow: "0 0 7px #d10f0f",
    "@media (max-width: 400px)": {
      marginRight: "3rem !important",
    },
    animation: "$text_from_left 2s ease-in-out forwards",
  },
  "@keyframes text_from_left": {
    "0%": {
      right: "850px",
    },
    "100%": {
      right: 0,
    },
  },
  text_from_right: {
    fontFamily: "'Dancing Script', cursive",
    position: "relative",
    textAlign: "right",
    textShadow: "0 0 6px #141181",
    color: "#22c3c3db",
    animation: "$text_from_right 2.2s ease-in-out forwards",
  },
  "@keyframes text_from_right": {
    "0%": {
      left: "850px",
    },
    "100%": {
      left: 0,
    },
  },
});

export default useStyles;
