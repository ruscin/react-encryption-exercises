/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-bind */

import React from "react";
import { TextareaAutosize } from "@material-ui/core";

export function TextArea(props) {
  const {
    text,
    className,
    handleInputChange,
    fontSize,
    placeholderMessage,
    id,
  } = props;
  return (
    <TextareaAutosize
      value={text}
      rowsMin={8}
      rowsMax={30}
      placeholder={placeholderMessage}
      className={className}
      id={id}
      onChange={handleInputChange}
      style={{
        fontSize: fontSize,
      }}
    />
  );
}
