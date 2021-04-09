/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-bind */

import React from "react";

import AES from "crypto-js/aes";
import CFBmode from "crypto-js/mode-cfb";
import CTRmode from "crypto-js/mode-ctr";
import ECBmode from "crypto-js/mode-ecb";
import OFBmode from "crypto-js/mode-ofb";

import {
  Input,
  MenuItem,
  Grid,
  Select,
  TextareaAutosize,
  Button,
} from "@material-ui/core";

import "./app.styles.scss";
import { makeStyles } from "@material-ui/core/styles";

import { TextArea } from "./components/TextArea";

const ECB = "ECB";
const CFB = "CFB";
const CTR = "CTR";
const CBC = "CBC";
const OFB = "OFB";
const FONT_INPUT = "fontInput";

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
  },
  input: {
    width: "50px",
  },
});

const hexToAscii = (string) => {
  const hex = string.toString();
  let decodedString = "";
  for (let i = 0; i < hex.length; i += 2) {
    decodedString += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }

  return decodedString;
};

const getMode = (mode) => {
  switch (mode) {
    case ECB:
      return ECBmode;
    case CFB:
      return CFBmode;
    case CTR:
      return CTRmode;
    case OFB:
      return OFBmode;
    default:
      return "";
  }
};

function App(props) {
  const classes = useStyles();

  const [blockMode, setBlockMode] = React.useState(CBC);
  const [message, setMessage] = React.useState("");
  const [encryptedMessage, setEncryptedMessage] = React.useState("");
  const [decryptedMessage, setDecryptedMessage] = React.useState("");
  const [timeToEncrypt, setTimeToEncrypt] = React.useState(0);
  const [fontSize, setFontSize] = React.useState(12);

  const changeTexts = (text) => {
    const key = "1234567890123456";
    let t0 = performance.now();
    const encryptedMessage = AES.encrypt(
      text,
      key,
      blockMode === CBC ? {} : { mode: getMode(blockMode) }
    );
    const decryptedMessage = hexToAscii(
      AES.decrypt(
        encryptedMessage,
        key,
        blockMode === CBC ? {} : { mode: getMode(blockMode) }
      )
    );
    let t1 = performance.now();
    setTimeToEncrypt(t1 - t0);
    setMessage(text);
    setEncryptedMessage(encryptedMessage.toString());
    setDecryptedMessage(decryptedMessage);
  };

  const handleInputChange = (event) => {
    const receivedText = event.target.value;
    switch (event.target.id) {
      case FONT_INPUT:
        setFontSize(Number(receivedText));
        break;

      default:
        changeTexts(receivedText);
        break;
    }
  };
  const handleSelectChange = (event) => {
    setBlockMode(event.target.value);
    changeTexts(message);
  };
  const handleClick = () => {
    changeTexts(message);
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
            value={blockMode}
            onChange={handleSelectChange}
          >
            <MenuItem value={CBC}>CBC</MenuItem>
            <MenuItem value={ECB}>ECB</MenuItem>
            <MenuItem value={OFB}>OFB</MenuItem>
            <MenuItem value={CFB}>CFB</MenuItem>
            <MenuItem value={CTR}>CTR</MenuItem>
          </Select>
          <span> </span>
          <Input
            value={fontSize}
            className={classes.input}
            id={FONT_INPUT}
            onChange={handleInputChange}
          ></Input>
        </Grid>
        <Grid item>
          {" "}
          <TextArea
            text={message}
            placeholderMessage="wpisz swoją wiadomość"
            className={classes.textArea}
            id={"firstInput"}
            handleInputChange={handleInputChange}
            fontSize={fontSize}
          />
          <TextArea
            text={encryptedMessage}
            placeholderMessage="zaszyfrowana wiadomość"
            id={"secondInput"}
            className={classes.textArea}
            fontSize={fontSize}
          />
          <TextArea
            text={decryptedMessage}
            placeholderMessage="odszyfrowana wiadomość"
            id={"thirdInput"}
            className={classes.textArea}
            fontSize={fontSize}
          />
        </Grid>
        <Grid>
          <div>czas wykonania w ms: {timeToEncrypt} </div>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClick}
            style={{
              marginTop: "20px",
            }}
          >
            przelicz
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
