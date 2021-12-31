import { makeStyles } from "@mui/styles";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/core/ButtonUnstyled";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";

export const useStyles = makeStyles({
  links: {
    color: "#ff5722",
    fontFamily: "'Dancing Script', cursive !important",
    fontWeight: "bold !important",
    marginBottom: "0.35rem",
    textShadow: "0px 0px 5px #1d5883",
    transition: "all 0.5s linear",
    position: "relative",
    display: "block",
    cursor: "pointer",
    textDecoration: "none",

    "&:hover": {
      color: "#22c3c3db",
      textDecoration: "underline",
      textShadow: "0px 0px 5px #000000",
      transform: "scale(1.2)",
    },
    "@media (max-width: 600px)": {
      fontSize: "2rem ",
    },
    "@media (max-width: 400px)": {
      fontSize: "1.8rem ",
    },
  },
  anime0: {
    animation: "$anime0 1.5s 1s ease-out forwards",
    bottom: "850px",
  },
  "@keyframes anime0": {
    from: {
      bottom: "500px",
      opacity: 0,
    },
    to: {
      bottom: 0,
      opacity: 1,
    },
  },
  anime1: {
    animation: "$anime1 1.5s 1.5s ease-out forwards",
    left: "850px",
  },
  "@keyframes anime1": {
    from: {
      left: "500px",
      opacity: 0,
    },
    to: {
      left: 0,
      opacity: 1,
    },
  },
  anime2: {
    animation: "$anime2 1.5s 1.5s ease-out forwards",
    right: "850px",
  },
  "@keyframes anime2": {
    from: {
      right: "500px",
      opacity: 0,
    },
    to: {
      right: 0,
      opacity: 1,
    },
  },
  anime3: {
    animation: "$anime3 1.5s 1.5s ease-out forwards",
    top: "850px",
  },
  "@keyframes anime3": {
    from: {
      top: "500px",
      opacity: 0,
    },
    to: {
      top: 0,
      opacity: 1,
    },
  },
  stil: {
    color: "#ff5722",
    textDecoration: "none",
    fontSize: "1.4rem",
    textIndent: "0.5rem",
    cursor: "pointer",
    transition: "all 1s",
    "&:hover": {
      color: "#0591f4",
      transform: "scale(1.1)",
    },
  },
  cook_image: {
    width: "100%",
    border: "5px groove #ff5722",
    padding: "6px",
  },
  "@media (min-width: 900px)": {
    user_background: {
      background: "linear-gradient(159deg, black, transparent)",
      minHeight: "100vh",
      padding: "0.4rem",
      display: "flex",
      flexDirection: "column",
    },
  },
  "@media (max-width: 899px)": {
    user_background2: {
      backgroundColor: "black",
      padding: "0.4rem",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
  },
  nothing: {},
});

// set animation for each link
export const animeEntry = (i, classes) => {
  if (i === 0) {
    return `${classes.links} ${classes.anime0}`;
  } else if (i === 1) {
    return `${classes.links} ${classes.anime1}`;
  } else if (i === 2) {
    return `${classes.links} ${classes.anime2}`;
  } else if (i === 3) {
    return `${classes.links} ${classes.anime1}`;
  }
};

// style for Profil button

const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
  const { children, ...other } = props;

  return (
    <svg width="150" height="50" {...other} ref={ref}>
      <polygon points="0,50 0,0 150,0 150,50" className="bg" />
      <polygon points="0,50 0,0 150,0 150,50" className="borderEffect" />
      <foreignObject x="0" y="0" width="150" height="50">
        <div className="content">{children}</div>
      </foreignObject>
    </svg>
  );
});

ButtonRoot.propTypes = {
  children: PropTypes.node,
};

const CustomButtonRoot = styled(ButtonRoot)(
  ({ theme }) => `
  overflow: visible;
  cursor: pointer;
  --main-color: ${
    theme.palette.mode === "light" ? "rgb(25,118,210)" : "rgb(144,202,249)"
  };
  --hover-color: ${
    theme.palette.mode === "light"
      ? "rgba(25,118,210,0.04)"
      : "rgba(144,202,249,0.08)"
  };
  --active-color: ${
    theme.palette.mode === "light"
      ? "rgba(25,118,210,0.12)"
      : "rgba(144,202,249,0.24)"
  };

  & polygon {
    fill: transparent;
    transition: all 800ms ease;
    pointer-events: none;
  }
  
  & .bg {
    stroke: var(--main-color);
    stroke-width: 0.5;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
    fill: transparent;
  }

  & .borderEffect {
    stroke: var(--main-color);
    stroke-width: 2;
    stroke-dasharray: 150 600;
    stroke-dashoffset: 150;
    fill: transparent;
  }

  &:hover,
  &.${buttonUnstyledClasses.focusVisible} {
    .borderEffect {
      stroke-dashoffset: -600;
    }

    .bg {
      fill: var(--hover-color);
    }
  }

  &:focus,
  &.${buttonUnstyledClasses.focusVisible} {
    outline: none;
  }

  &.${buttonUnstyledClasses.active} { 
    & .bg {
      fill: var(--active-color);
      transition: fill 300ms ease-out;
    }
  }

  & foreignObject {
    pointer-events: none;

    & .content {
      font-family: Helvetica, Inter, Arial, sans-serif;
      font-size: 14px;
      font-weight: 200;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--main-color);
      text-transform: uppercase;
    }

    & svg {
      margin: 0 5px;
    }
  }`
);

export const SvgButton = React.forwardRef(function SvgButton(props, ref) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
});
