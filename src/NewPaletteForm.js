import * as React from "react";
import PaletteFormNav from "./PaletteFormNav";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { withStyles } from "@material-ui/styles";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DraggableColorList from "./DraggableColorList";
import { arrayMoveImmutable } from "array-move";
import ColorPickerForm from "./ColorPickerForm";
import styles from "./styles/NewPaletteFormStyles";
import { DRAWER_WIDTH } from "./constants";
import seedColors from "./seedColors";

const drawerWidth = DRAWER_WIDTH;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const NewPaletteForm = ({ savePalette, history, palettes, classes }) => {
  const [open, setOpen] = React.useState(false);
  const [colors, setColors] = React.useState(seedColors[0].colors);

  const maxColors = 20;
  const paletteIsFull = colors.length >= maxColors;

  // Methods
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  const clearColors = () => {
    setColors([]);
  };
  const addRandomColor = () => {
    //pick random color from existing palettes
    const allColors = palettes.map((p) => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = colors.some(
        // eslint-disable-next-line no-loop-func
        (color) => color.name === randomColor.name
      );
    }
    setColors([...colors, randomColor]);
  };

  const handleSubmit = (palette) => {
    const newPalette = {
      paletteName: palette.paletteName,
      emoji: palette.emoji,
      id: palette.paletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
    };
    savePalette(newPalette);
    history.push("/");
  };
  const removeColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMoveImmutable(colors, oldIndex, newIndex));
  };
  return (
    <Box sx={{ display: "flex" }}>
      <PaletteFormNav
        open={open}
        palettes={palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* Content Goes Here */}
        {/* Drawer Content */}

        <div className={classes.container}>
          <Typography variant="h4" align="center" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={clearColors}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={addRandomColor}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            colors={colors}
          />
        </div>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
          pressDelay={160}
        />
      </Main>
    </Box>
  );
};

export default withStyles(styles)(NewPaletteForm);
