import Gordon from "../../images/gordon.jpg";

// css styles

export const ourCooks = {
  color: "orangered",
  background: "linear-gradient(45deg, black, transparent)",
  fontFamily: "'Dancing Script', cursive ",
  fontStyle: "italic",
  "@media (max-width: 500px)": {
    fontSize: "3.5rem ",
  },
};
export const inputCon = {
  background: "linear-gradient(325deg, black, transparent)",
  textAlign: "center",
  padding: "1rem",
};

export const input = {
  ".css-mps6pm-MuiInputBase-input-MuiFilledInput-input": {
    color: "white !important",
  },
};

export const cardCon = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
};

export const noCook = {
  color: "#ff4500",
  alignSelf: "center",
  fontWeight: "bold",
  fontSize: "2rem",
  minHeight: "70vh",
};

export const pagination = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "2.5rem auto",
  ".css-1ysyrvn-MuiButtonBase-root-MuiPaginationItem-root": {
    border: "3px solid #ff4500",
    background: "#ffffff9e",
  },
  ".css-1ysyrvn-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
    color: "#ff4500",
    border: "3px solid #ff4500",
    backgroundColor: "#000000a8",
  },
};

export const componentCon = {
  backgroundColor: "#778899a8",
  backgroundImage: `url(${Gordon})`,
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
