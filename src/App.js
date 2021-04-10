/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-bind */

import React from "react";

import AES, { decrypt } from "crypto-js/aes";
import CFBmode from "crypto-js/mode-cfb";
import CTRmode from "crypto-js/mode-ctr";
import ECBmode from "crypto-js/mode-ecb";
import OFBmode from "crypto-js/mode-ofb";
import enc from "crypto-js/enc-hex";

import { Input, MenuItem, Grid, Select, Button } from "@material-ui/core";

import "./app.styles.scss";
import { makeStyles } from "@material-ui/core/styles";

import { TextArea } from "./components/TextArea";
import { MyTable } from "./components/MyTable";

const XOR = require("xor-crypt");

const KEY = "1234567890123456";
const IV = enc.parse("101112131415161718191a1b1c1d1e1f");

const ECB = "ECB";
const CFB = "CFB";
const CTR = "CTR";
const CBC = "CBC";
const OFB = "OFB";
const MY_MODE = "myCBC";
const FONT_INPUT = "fontInput";

const allModes = [CBC, ECB, OFB, CFB, CTR, MY_MODE];

const statsMap = allModes.reduce((acc, el) => {
  acc[el] = {
    elements: [],
    avg: null, //TODO: refactor this nulls, they are so bad
    min: null,
    max: null,
  };
  return acc;
}, {});

function createData(name, averageTime, min, max) {
  return { name, averageTime, min, max };
}

const createRows = (aaa) => {
  return Object.entries(aaa).map(([name, stat]) =>
    createData(name, stat.avg, stat.min, stat.max)
  );
};

const hexToAscii = (string) => {
  const hex = string.toString();
  let decodedString = "";
  for (let i = 0; i < hex.length; i += 2) {
    decodedString += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }

  return decodedString;
};

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
  table: {
    backgroundColor: "#D9D9D9",
  },
});

const myCBCModeEncryption = (text) => {
  const toEncrypt = XOR(text, IV);

  const encryptedMessage = AES.encrypt(toEncrypt, KEY, {
    mode: ECBmode,
  });

  return encryptedMessage;
};

const myCBCModeDecryption = (text) => {
  const toDecrypt = hexToAscii(
    AES.decrypt(text, KEY, { mode: ECBmode }).toString()
  );

  const decryptedMessage = XOR(toDecrypt, IV);

  return decryptedMessage;
};

console.log(myCBCModeEncryption("kotek"));
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
  const [rows, setRows] = React.useState(createRows(statsMap));

  const setStatsMap = (passedTime) => {
    statsMap[blockMode].elements.push(passedTime);

    const sum = statsMap[blockMode].elements.reduce((a, b) => a + b, 0);

    statsMap[blockMode].avg = sum / statsMap[blockMode].elements.length;
    if (
      statsMap[blockMode].min === null ||
      statsMap[blockMode].min > passedTime
    ) {
      statsMap[blockMode].min = passedTime;
    }
    if (
      statsMap[blockMode].max === null ||
      statsMap[blockMode].max < passedTime
    ) {
      statsMap[blockMode].max = passedTime;
    }
  };

  const changeTexts = (text) => {
    let t0 = performance.now();
    let encryptedMessage, decryptedMessage;

    if (blockMode !== MY_MODE) {
      // TODO: change it it looks awful
      encryptedMessage = AES.encrypt(
        text,
        KEY,
        blockMode === CBC ? {} : { mode: getMode(blockMode) }
      );
      decryptedMessage = hexToAscii(
        AES.decrypt(
          encryptedMessage,
          KEY,
          blockMode === CBC ? {} : { mode: getMode(blockMode) }
        )
      );
    } else {
      encryptedMessage = myCBCModeEncryption(text);
      decryptedMessage = myCBCModeDecryption(encryptedMessage);
    }

    let t1 = performance.now();
    const passedTime = t1 - t0;

    setStatsMap(passedTime);
    setTimeToEncrypt(passedTime);
    setRows(createRows(statsMap));
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
  const generateTen = () => {
    for (let i = 0; i < 10; i++) {
      changeTexts(message);
    }
  };
  const resetStatsMap = () => {
    allModes.forEach((mode) => {
      statsMap[mode] = {
        elements: [],
        avg: null, //TODO: refactor this nulls, they are so bad
        min: null,
        max: null,
      };
    });
    setRows(createRows(statsMap));
  };

  //TODO: make more components, it looks so bad

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
            labelId="selectModeLabel"
            id="selectMode"
            value={blockMode}
            onChange={handleSelectChange}
          >
            <MenuItem value={CBC}>CBC</MenuItem>
            <MenuItem value={ECB}>ECB</MenuItem>
            <MenuItem value={OFB}>OFB</MenuItem>
            <MenuItem value={CFB}>CFB</MenuItem>
            <MenuItem value={CTR}>CTR</MenuItem>
            <MenuItem value={MY_MODE}>MY_MODE</MenuItem>
          </Select>
          <span> </span>
          <Input
            value={fontSize}
            className={classes.input}
            id={FONT_INPUT}
            onChange={handleInputChange}
          ></Input>
        </Grid>

        {fontSize === 0 ? (
          <div></div>
        ) : (
          <Grid item>
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
        )}

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
          <span> </span>
          <Button
            variant="contained"
            color="secondary"
            onClick={generateTen}
            style={{
              marginTop: "20px",
            }}
          >
            generuj 10
          </Button>
          <span> </span>
          <Button
            variant="contained"
            color="secondary"
            onClick={resetStatsMap}
            style={{
              marginTop: "20px",
            }}
          >
            wyzeruj Tabele
          </Button>
        </Grid>
        <Grid style={{ margin: "20px" }}>
          <MyTable name={classes.table} rows={rows}></MyTable>
        </Grid>
      </Grid>
    </div>
  );
}
export default App;
