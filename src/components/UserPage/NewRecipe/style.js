// css styles

export const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const blueColor = {
  "& .MuiInputBase-input.MuiInput-input": {
    color: "#0255ee",
  },
};

export const gridCon = {
  p: 3,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
};
export const gridConStyle = {
  background: "#ffffff59",
  borderRadius: "1rem",
  padding: "1rem 0",
  backgroundColor: "#ffffff38",
  backgroundImage: `linear-gradient(to right bottom, rgba(0, 0, 0, 0.48), rgb(255 255 255 / 0%)) rgba(255, 255, 255, 0.22)`,
  backdropFilter: `blur(7px)`,
  boxShadow: "10px 10px 10px rgba(30, 30, 30, 0.1)",
};

export const submitButton = {
  width: "50%",
  margin: "1.5rem auto",
  "@media (max-width: 1200px)": {
    width: "80% ",
  },
  "@media (max-width: 900px)": {
    width: "60% ",
  },
  "@media (max-width: 510px)": {
    width: "80% ",
  },
};

export const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "75%",
};
