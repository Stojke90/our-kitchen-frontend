//css style
export const cardCon = {
  maxWidth: 480,
  margin: "auto",
  backgroundColor: "#ffffff40",
  color: "#ff4500",
  border: "solid 1px black",
  position: "relative",

  animation: "recipeCard 2s ease-in-out 1s alternate both running",
  "@keyframes recipeCard": {
    from: {
      bottom: "1800px",
      opacity: 0,
    },
    to: {
      bottom: 0,
      opacity: 1,
    },
  },
};

export const cardHeader = {
  textAlign: "center",
  ".css-nrdprl-MuiTypography-root": {
    color: "#fff ",
  },
};

export const listItems = {
  marginBottom: "0.5rem",
  fontWeight: "bold",
  color: "#f0f8ff",
  textShadow: "0 0 8px #000",
};

export const preparationText = {
  fontWeight: "bold",
  color: "#f0f8ff",
  textShadow: "0 0 8px #000",
};

export const buttonCon = {
  display: "flex",
  backgroundColor: "#f0f8ff91",
  justifyContent: "space-evenly",
};
