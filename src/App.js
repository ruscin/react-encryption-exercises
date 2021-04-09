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

    console.log(
      AES.decrypt(
        encryptedMessage,
        key,
        blockMode === CBC ? {} : { mode: getMode(blockMode) }
      )
    );

    setMessage(text);
    setEncryptedMessage(encryptedMessage.toString());
    setDecryptedMessage(decryptedMessage);
  };

  const countTime = (receivedText) => {
    let t0 = performance.now();
    changeTexts(receivedText);
    let t1 = performance.now();
    setTimeToEncrypt(t1 - t0);
  };

  const handleInputChange = (event) => {
    const receivedText = event.target.value;
    switch (event.target.id) {
      case FONT_INPUT:
        setFontSize(Number(receivedText));
        break;

      default:
        countTime(receivedText);
        break;
    }
  };
  const handleSelectChange = (event) => {
    setBlockMode(event.target.value);
    countTime(message);
  };
  const handleClick = () => {
    countTime(message);
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
          {/* TODO: wydzielić component */}
          <TextareaAutosize
            aria-label="message"
            value={message}
            rowsMin={8}
            rowsMax={30}
            placeholder="wpisz swoją wiadomość"
            className={classes.textArea}
            id={"firstInput"}
            onChange={handleInputChange}
            style={{
              fontSize: fontSize,
            }}
          />
          <TextareaAutosize
            aria-label="encryptedMessage"
            rowsMin={8}
            rowsMax={30}
            value={encryptedMessage}
            placeholder="zaszyfrowana wiadomość"
            id={"secondInput"}
            className={classes.textArea}
            style={{
              fontSize: fontSize,
            }}
          />
          <TextareaAutosize
            aria-label="encryptedMessage"
            rowsMin={8}
            rowsMax={30}
            value={decryptedMessage}
            placeholder="odszyfrowana wiadomość"
            id={"thirdInput"}
            className={classes.textArea}
            style={{
              fontSize: fontSize,
            }}
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
