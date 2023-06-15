import sizes from "./sizes";
import bg from "./bg.svg";

const styles = {
  "@global": {
    ".fade-exit": {
      poacity: 1,
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 500ms ease-out",
    },
    ".PaletteList-createBtn-1bvm48j": {
      textDecoration: "none",
      backgroundColor: "rgba(215,222,225)",
      padding: "10px",
      fontSize: "1.2rem",
      color: "#2e4357 !important",
      fontWeight: "500",
      transition: "all 0.5s",
      "&:hover": {
        backgroundColor: "rgba(215,222,225,0.8)",
      },
    },
  },
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    /* background by SVGBackgrounds.com */
    backgroundColor: "#5725DB",
    backgroundImage: `url(${bg})`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    overflow: "scroll",
  },
  heading: {
    fontSize: "2rem",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    [sizes.down("xl")]: {
      width: "80%",
    },
    [sizes.down("xs")]: {
      width: "75%",
    },
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white",
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "1.5rem",
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)",
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      gridGap: "1.4rem",
    },
  },
  createBtn: {
    decoration: "none",
    color: "red",
  },
};
export default styles;
