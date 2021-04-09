/* eslint-disable react/jsx-no-bind */
import React from "react";

import "./app.styles.scss";

import { makeStyles } from "@material-ui/core/styles";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  background: {
    backgroundColor: "#A9A9A9",
    minHeight: "100vh",
  },
  textArea: {
    margin: "10px",
    width: "330px",
    backgroundColor: "#D9D9D9",
    fontSize: "15px",
  },
});

function App(props) {
  const classes = useStyles();

  const [exercise, setExercise] = React.useState(1);
  const [message, setMessage] = React.useState("");
  const [encryptedMessage, setEncryptedMessage] = React.useState("");

  const handleInputChange = (event) => {
    setMessage(event.target.value);
    const changedMessage = "kotek";
    setEncryptedMessage(changedMessage);
  };
  const handleSelectChange = (event) => {
    setExercise(event.target.value);
  };

  return (
    <div>
      <Grid
        className={classes.background}
        container
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <h1>Szyfrowanie</h1>
        </Grid>
        <Grid item>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={exercise}
            onChange={handleSelectChange}
          >
            <MenuItem value={1}>Zadanie 1</MenuItem>
            <MenuItem value={2}>Zadanie 2</MenuItem>
            <MenuItem value={3}>Zadanie 3</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          {" "}
          <TextareaAutosize
            aria-label="message"
            value={message}
            rowsMin={8}
            placeholder="wpisz swoją wiadomość"
            className={classes.textArea}
            onChange={handleInputChange}
          />
          <TextareaAutosize
            aria-label="encryptedMessage"
            rowsMin={8}
            value={encryptedMessage}
            placeholder="zaszyfrowana wiadomość"
            className={classes.textArea}
          />
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
