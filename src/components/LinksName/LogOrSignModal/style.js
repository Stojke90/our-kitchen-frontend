const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  border: "2px solid #000",
  p: 2,
  maxHeight: "85vh",
  width: "20.5rem",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "0.3rem",
    smootScroll: "smooth",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#232332",
    outline: "1px solid slategrey",
    borderRadius: "1rem",
  },
};

export default style;
