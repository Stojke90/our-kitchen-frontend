//css style

export const cardCon = {
  width: "300px",
  height: "max-content",
  margin: "1rem",
  backgroundColor: "#ffffff38",
  "@media (max-width: 900px)": { margin: "1rem 0.5rem" },
  backgroundImage: `linear-gradient(to right bottom, rgba(0, 0, 0, 0.48), rgb(255 255 255 / 0%)) rgba(255, 255, 255, 0.22)`,
  backdropFilter: `blur(3px)`,
  boxShadow: "10px 10px 10px rgba(30, 30, 30, 0.1)",
  border: "solid 1px #0000004a",
};

export const cardTitle = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  maxWidth: "290px",
  fontWeight: "bold",
};

export const cardActionStyle = {
  display: "flex",
  justifyContent: "space-around",
};
