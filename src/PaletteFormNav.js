import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { Component } from "react";
import PaletteMetaForm from "./PaletteMetaForm";
import { Link } from "react-router-dom";

const drawerWidth = 400;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  height: "64px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = { newPaletteName: "", formShwoing: false };
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };
  showForm() {
    this.setState({ formShwoing: true });
  }
  hideForm() {
    this.setState({ formShwoing: false });
  }
  render() {
    const { open, palettes, handleSubmit } = this.props;
    return (
      <div>
        <CssBaseline />
        <AppBar position="fixed" color="default" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Create A Palette
            </Typography>
          </Toolbar>
          {/* Save Palette Form */}
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                style={{ marginRight: "1rem" }}
                variant="contained"
                color="secondary"
              >
                Go Back
              </Button>
            </Link>
            <Button
              style={{ marginRight: "1rem" }}
              variant="contained"
              onClick={this.showForm}
              color="primary"
            >
              Save
            </Button>
          </div>
        </AppBar>
        {this.state.formShwoing && (
          <PaletteMetaForm
            palettes={palettes}
            handleSubmit={handleSubmit}
            hideForm={this.hideForm}
          />
        )}
      </div>
    );
  }
}
export default PaletteFormNav;
