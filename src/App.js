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
  const [age, setAge] = React.useState(20);
  const classes = useStyles();

  const handleInputChange = (event) => {
    console.log(event.target.value);
  };
  const handleSelectChange = (event) => {
    setAge(event.target.value);
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
            value={age}
            onChange={handleSelectChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          {" "}
          <TextareaAutosize
            aria-label="message"
            rowsMin={8}
            placeholder="wpisz swoją wiadomość"
            className={classes.textArea}
            onChange={handleInputChange}
          />
          <TextareaAutosize
            aria-label="encryptedMessage"
            rowsMin={8}
            placeholder="wersja zaszyfrowana"
            className={classes.textArea}
          />
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
