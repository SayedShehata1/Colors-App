import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }
  changeFormat(val) {
    this.setState({ format: val });
  }

  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { level, format } = this.state;

    const colorBoxes = colors[level].map((color) => {
      return (
        <ColorBox
          key={color.id}
          background={color[format]}
          name={color.name}
          moreUrl={`/palette/${id}/${color.id}`}
          showingFullPalette
        />
      );
    });

    return (
      <div className="Palette">
        <Navbar
          handleChange={this.changeFormat}
          level={level}
          changeLevel={this.changeLevel}
          showingAllColors
        />
        <div className="Palette-colors"> {colorBoxes} </div>

        <PaletteFooter paletteName={paletteName} emoji={emoji} />
        {/* <footer className="Palette-footer">
          {paletteName}
          <span className="emoji"> {emoji} </span>
        </footer> */}
      </div>
    );
  }
}

export default Palette;
