import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  field: {
    width: "80%",
    marginBottom: "0.5rem",
  },
  iconShowPassword: {
    width: "1.8rem",
    height: "1.8rem",
  },
  cooksImage: {
    width: "8rem",
    height: "8rem",
    display: "block",
    margin: " 0 auto 0.5rem",
    borderRadius: "50%",
    border: "0.3rem solid #00f",
    boxShadow: "0 0 9px 3px #2a2a20, inset 0 0 13px 6px #cfc9c9",
    padding: "4px",
  },
  loader: {
    width: "80%",
    display: "block",
    margin: "auto",
  },
});

export default useStyles;
