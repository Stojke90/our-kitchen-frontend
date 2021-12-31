import FoodBackground from "../../images/foodGalery.jfif";

// css styleexport
export const galeryCon = {
  background: `url(${FoodBackground}) fixed`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

export const imageCon = {
  display: "flex",
  justifyContent: "center",
  margin: "calc((100vh - 577px)/2) auto",
};

export const ulForImages = (theme) => {
  const ulForImages = {
    width: "50vw",
    height: "85vh",
    backgroundColor: "#00000075",
    [theme.breakpoints.down("md")]: {
      width: "80vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
    },

    "&::-webkit-scrollbar": {
      width: "0.5rem",
      background: "#1c1c27b5",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#ff4500",
      borderRadius: "10px",
    },
  };
  return ulForImages;
};

export const textCon = {
  textAlign: "center",
  fontSize: "2rem",
  color: "#ff4500",
  backgroundColor: "#00000047",
};

export const loaderCon = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};
