import kitchen from "../../images/recipeKitchen.jpg";
// css style for input
export const inputStyle = {
  background: "#00000029",
  margin: "0.5rem",
  "& .MuiOutlinedInput-notchedOutline": {
    borderWidth: "2px ",
    borderColor: "black",
  },
  "& .MuiFormLabel-root-MuiInputLabel-root": {
    color: "black",
  },
  "& .MuiInputBase-input-MuiOutlinedInput-input": { color: "#fff" },
};

export const recipesCon = {
  background: `url(${kitchen})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  minHeight: "90vh",
};

export const text1 = {
  fontFamily: "'Dancing Script', cursive",
  background: `linear-gradient(315deg, orangered, transparent)`,
  "@media (max-width: 500px)": {
    fontSize: "2rem ",
  },
};

export const text2 = {
  background: `linear-gradient( 45deg, #0095ff, transparent)`,
  marginBottom: "1rem",
  "@media (max-width: 500px)": {
    fontSize: "0.8rem ",
  },
};

export const inputCon = {
  display: "flex",
  justifyContent: "space-evenly",
  flexWrap: "wrap",
  alignItems: "center",
  "@media (max-width: 500px)": {
    flexDirection: "column",
  },
};

export const mainCardCom = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
};

export const paginationStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "2.5rem auto",
  "& .MuiPaginationItem-root": {
    border: "3px solid #ff4500",
    background: "#ffffff9e",
    "& :hover": { color: "#ff4500" },
  },
  "& .MuiPaginationItem-root.Mui-selected": {
    color: "#ff4500 !important",
    border: "3px solid #ff4500 !important",
    backgroundColor: "#000000a8 !important",
  },
};
