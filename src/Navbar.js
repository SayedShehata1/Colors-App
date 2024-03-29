import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./styles/NavbarStyles";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex", open: false };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }
  handleFormatChange(e) {
    this.setState({ format: e.target.value, open: true });
    this.props.handleChange(e.target.value);
  }
  closeSnackbar() {
    this.setState({ open: false });
  }
  render() {
    const { level, changeLevel, showingAllColors, classes } = this.props;
    const { format } = this.state;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to="/">React Colors</Link>
        </div>
        {showingAllColors && (
          <div className="slider-container">
            <span>level : {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        )}

        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">Hex- #ffffff</MenuItem>
            <MenuItem value="rgb">rgb- rgb(250,250,250)</MenuItem>
            <MenuItem value="rgba">rgba- rgba(250,250,250,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          message={
            <span id="message-id">
              Format changed to {format.toLocaleUpperCase()}{" "}
            </span>
          }
          ContentProps={{ "aria-describedby": "message-id" }}
          onClose={this.closeSnackbar}
          action={
            <IconButton
              onClick={this.closeSnackbar}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          }
        />
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);
