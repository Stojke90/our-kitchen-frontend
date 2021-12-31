import newRecipe from "../../images/newRecipe.jpg";
// css style
export const gridCon = {
  width: "100%",
  background: `url(${newRecipe})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
};

export const boxCon = {
  borderBottom: 1,
  borderColor: "#000000d6",
  boxShadow: "0px 3px 20px 5px #0000009c",
};

export const tabPanel = {
  color: "white",
  background: "#0000003b",
  backgroundImage: `linear-gradient(to right bottom, rgba(0, 0, 0, 0.48), rgb(255 255 255 / 0%)) rgba(255, 255, 255, 0.22)`,
  backdropFilter: `blur(7px)`,
  boxShadow: "10px 10px 10px rgba(30, 30, 30, 0.1)",
};

// style for show or hide component
export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
