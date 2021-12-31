import Profil from "../../images/profil.jpg";
// css style

export const gridCon = {
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#a9a9a9",
  background: `url(${Profil}) no-repeat`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "0 1rem ",
  "@media (max-width: 900px)": {
    minHeight: "92.2vh",
  },
  "@media (max-width: 600px)": {
    padding: "1rem ",
  },
};

export const cardCon = {
  maxWidth: 800,
  display: "flex",
  flexWrap: "wrap",
  margin: "auto",
  padding: "0 0.5rem",
  backgroundColor: "#fff2f22e",
  border: "solid 1px #000000d9",
  boxShadow: "0 0 20px 7px #000000e0",
  animation: "stretch 1.8s ease-in-out 0s alternate none running",
  "@keyframes stretch": {
    "0%": {
      transform: "scale(0.3)",
      opacity: 0,
    },
    "50%": { transform: "scale(1.5)" },
    "100%": {
      transform: "scale(1)",
      opacity: 1,
    },
  },
};

export const cookDetails = {
  width: "50%",
  "@media (max-width: 600px)": {
    width: "100%",
  },
};

export const cookName = { width: "100%", fontStyle: "italic" };

export const textShadow = { textShadow: "0 0 3px #fff9" };

export const spanData = {
  color: "#fff",
  textShadow: "0 0 7px #000",
  display: "inherit",
};

export const cardAction = { width: "100%", justifyContent: "space-around" };

export const recipesListCon = {
  display: "flex",
  justifyContent: "space-between",
  color: "#fff",
  padding: "0.5rem",
  textShadow: "0 0 6px black",
  textDecorationLine: "none",
  transition: "all 0.7s",
  ":hover": {
    boxShadow: "0 0 11px 3px black",
    color: "#7fff00",
    cursor: "pointer",
    transform: "scale(1.02)",
    borderRadius: "0.5rem",
  },
  ":focus": {
    cursor: "wait",
  },
};

export const skeletonLoader = {
  width: "50%",
  height: "50vh",
  backgroundColor: "#121111a8",
  borderRadius: "1rem",
  position: " relative",
  left: " 50%",
  top: " 50%",
  transform: " translate(-50%, 50%)",
};
