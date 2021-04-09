/* eslint-disable react/jsx-no-bind */
import React, { useState } from "react";
import AES from "crypto-js/aes";
import "./app.styles.scss";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

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
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const time = (time = 5000) => {
    const timePromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`uber dojechał w czasie ${time}`);
      }, time);
    });

    timePromise.then((value) => console.log(value));
  };

  const randomNumbers = () => {
    const numbersArray = [...Array(100)].map(() =>
      Math.round(Math.random() * (50 - -50) + -50)
    );
    const filterdNumbers = numbersArray
      .filter((el) => el % 2 === 0)
      .sort((a, b) => b - a);

    return filterdNumbers;
  };

  const arrayStats = (numbers = randomNumbers()) => {
    const finalArray = numbers.reduce(
      (acc, el) => {
        if (el < acc.min) {
          acc.min = el;
        }
        if (el > acc.max) {
          acc.max = el;
        }
        acc.total += el;
        acc.avg += el / numbers.length;
        return acc;
      },
      { min: numbers[0], max: numbers[0], avg: 0, total: 0 }
    );

    console.log({
      min: finalArray.min,
      max: finalArray.max,
      avg: finalArray.avg,
      totalAvg: finalArray.total / numbers.length,
    });

    return {
      min: finalArray.min,
      max: finalArray.max,
      avg: finalArray.avg,
      totalAvg: finalArray.total,
    };
  };

  const digitsFunc = (...numbers) => {
    console.log("n", String(numbers).split(""));
    const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const usedNumbers = {};

    String(numbers)
      .split("")
      .forEach((el) => {
        if (!usedNumbers[el]) {
          usedNumbers[el] = true;
        }
      });

    const final = DIGITS.filter((d) => !usedNumbers[d]).sort((a, b) =>
      a.localeCompare(b)
    );
    console.log(final);
    return final;
  };
  const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
  const HOW_MANY_LETTERS = LETTERS.length;
  const letterFunc = (...chars) => {
    const usedChars = {};

    chars
      .join("")
      .toLowerCase()
      .split("")
      .forEach((el) => {
        if (!usedChars[el]) {
          usedChars[el] = true;
        }
      });

    return LETTERS.filter((letter) => !usedChars[letter]).join("");
  };

  const randomName = () => {
    let name = "";
    for (let i = 0; i < Math.floor(Math.random() * (15 - 3) + 3); i++) {
      name += LETTERS[Math.floor(Math.random() * HOW_MANY_LETTERS)];
    }

    return name[0].toUpperCase() + name.slice(1);
  };

  const nameFunc = () => {
    const people = [...Array(100)].map(() => {
      return {
        firstName: randomName(),
        lastName: randomName(),
        age: Math.floor(Math.random() * 100),
      };
    });

    return people.reduce(
      (acc, person) => {
        if (acc.oldest.age < person.age) {
          acc.oldest = person;
        }
        if (acc.youngest.age > person.age) {
          acc.youngest = person;
        }
        acc.averageAge += person.age / people.length;

        return acc;
      },
      {
        oldest: { age: people[0].age },
        youngest: { age: people[0].age },
        averageAge: 0,
      }
    );
  };

  console.log(nameFunc());

  console.log(letterFunc("Quick", "brown", "fox", "jumps"));

  // digitsFunc(1234, 2424, 0, 89);

  return (
    <div>
      <Grid
        className={classes.background}
        container
        direction="column"
        alignItems="center"
        justify="center"
      >
        <div>{counter}</div>
        <button onClick={incrementCounter}>
          kliknij mnie, żeby zwiększyć stan
        </button>
        <button onClick={() => time(2000)}>kliknij mnie, w celu promisa</button>
        <button onClick={() => arrayStats()}>kliknij mnie, 2</button>
        <button onClick={() => digitsFunc(2534)}>kliknij mnie, 3</button>
      </Grid>
    </div>
  );
}
export default App;
