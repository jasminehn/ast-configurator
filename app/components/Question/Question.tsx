/*
  Question.tsx
  Displays a Question within a Section.
*/

import React from "react";
import CheckGroup from "../CheckGroup/CheckGroup";
import DropdownGroup from "../DropdownGroup/DropdownGroup";
import RadioOption from "../RadioOption/RadioOption";
import { QuestionV2 } from "../Section/types";
import { isSelect, isText } from "../Section/utils";
import TextInput from "../TextInput/TextInput";
import styles from "./Question.module.css";

interface QuestionProps {
  /** The question data */
  data: QuestionV2;
  /** The current value of the response */
  value: string;
  /** The function that is called whenever the question's input changes */
  onInputChange: (name: string, value: string, controller: boolean) => void;
  /** A number to display alongside the question */
  number: number;
  /** Whether a submission attempt has been made yet */
  attempted: boolean;
}

const Question = ({
  data,
  value,
  onInputChange,
  number,
  attempted,
}: QuestionProps) => {

  // Calc if error should be displayed
  const error = React.useMemo(
    () =>
      isText(data) &&
      !!data.constraint &&
      value != "" &&
      !new RegExp(data.constraint).test(value),
    [data, value]
  );

  // Calc if the empty error should be displayed, based on if user
  // has attempted to submit.
  const emptyError = React.useMemo(
    () => !data.optional && ((isText(data) && (value === "")) || (isSelect(data) && data.type === "select" && value === "[]")) && attempted,
    [data, value, attempted]
  );

  return (
    <div className={styles.container}>
      {/* <div className={styles.index}>{number}.</div> */}
      <div className={styles.wrapper}>
        <p className={styles.prompt}>{data.prompt}</p>
        {/* Renders out a radio group for the options*/}
        {isSelect(data) && data.type === "radio" && (
          <div className={styles.radiogroup} role="radiogroup">
            {data.options.map((o, idx) => (
              <RadioOption
                key={idx}
                name={data.id}
                text={o.name}
                value={o.value}
                checked={value === o.value}
                onClick={onInputChange}
                disabled={false}
                controller={data.controller}
              />
            ))}
          </div>
        )}
        {/* Renders out a select group for the options*/}
        {isSelect(data) && data.type === "select" && <CheckGroup {...{data, value, onInputChange, attempted}}/>}
        {isSelect(data) && data.type === "dropdown" && <DropdownGroup {...{data, value, onInputChange, attempted}}/>}
        {/* Renders out a single text input for the options*/}
        {isText(data) && (
          <div style={{ order: 2, display: "block", paddingLeft: "8px" }}>
            <TextInput
              id={data.id}
              placeholder={data.placeholder}
              value={value}
              onChange={onInputChange}
              disabled={false}
              controller={data.controller}
              error={error || emptyError}
            />
          </div>
        )}
        {/* If empty, display the empty error */}
        {emptyError && (
          <div style={{ order: 3, paddingLeft: "8px", color: "red" }}>
            Please enter a value
          </div>
        )}
        {/* If not empty but another error, provide that error */}
        {!emptyError && error && isText(data) && (
          <div style={{ order: 3, paddingLeft: "8px", color: "red" }}>
            {data.error ?? "Please provide a valid value."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
