import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useEffect } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

export default function PaletteMetaForm({ palettes, handleSubmit, hideForm }) {
  const [stage, setStage] = React.useState("form");
  const [newPaletteName, setNewPaletteName] = React.useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  });

  const handleChange = (evt) => {
    setNewPaletteName(evt.target.value);
  };
  const showEmojiPicker = () => {
    setStage("emoji");
  };

  const savePalette = (emoji) => {
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native,
    };
    handleSubmit(newPalette);
  };

  return (
    <div>
      <Dialog open={stage === "emoji"}>
        <Picker onSelect={savePalette} />
      </Dialog>
      <Dialog open={stage === "form"} onClose={hideForm}>
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's
              unique!
            </DialogContentText>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              name="newPaletteName"
              onChange={handleChange}
              fullWidth
              margin="normal"
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name already used"]}
            />
          </DialogContent>
          <DialogActions style={{ margin: "0 1rem" }}>
            <Button onClick={hideForm}>Cancel</Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}
