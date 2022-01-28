// css styles

export const searcInput = {
  "& .MuiInputBase-root.MuiFilledInput-root:before": {
    borderBottom: "2px solid #ff5722",
  },
  "& .MuiInputBase-root.MuiFilledInput-root:after": {
    borderBottom: "2px solid #fff",
  },
  "& .MuiFormLabel-root.MuiInputLabel-root": {
    color: "#ff5722",
  },
  "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
    color: "#fff",
  },
  "& .MuiInputBase-input.MuiFilledInput-input": {
    color: "#ff5722",
  },
  "& .MuiInputBase-root.MuiFilledInput-root:hover:not(.Mui-disabled):before": {
    borderBottom: "2px solid rgb(26 40 214 / 87%)",
  },
};

export const gridCon = { margin: "auto" };

export const searchCon = { textAlign: "center", marginBottom: "1rem" };

export const conForCards = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
};

export const noRecipes = {
  minHeight: "50vh",
  marginTop: "10rem",
  color: "#fff",
  fontSize: "2rem",
  margin: "auto",
  textShadow: "0 0 9px #000000",
  textAlign: "center",
  "@media (max-width: 730px)": {
    fontSize: "1.5rem",
    marginTop: "10rem",
  },
};
