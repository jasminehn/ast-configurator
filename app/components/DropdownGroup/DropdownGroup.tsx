/**
 * DropdownGroup.tsx
 * A dropdown box that displays the answers to a question
 */

import { useMemo } from "react";
import Select from "react-select";
import styles from "../Question/Question.module.css";
import { SelectQuestion } from "../Section/types";

interface CheckGroupProps {
  /** The question data */
  data: SelectQuestion;
  /** The current value of the response */
  value: string;
  /** The function that is called whenever the question's input changes */
  onInputChange: (name: string, value: string, controller: boolean) => void;
  /** Whether a submission attempt has been made yet */
  attempted: boolean;
}

export const DropdownGroup = ({
  data,
  value,
  onInputChange,
  attempted,
}: CheckGroupProps) => {
  // Parse checkbox value
  const options = useMemo(() => {
    return data.options.map((o) => {
      return { value: o.value, label: o.name };
    });
  }, [data.options]);
  const selectVal = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );
  return (
    <div className={styles.radiogroup} style={{ margin: "8px 0px 8px 0px" }}>
      <Select
        options={options}
        value={selectVal}
        onChange={(option) =>
          onInputChange(data.id, option?.value ?? "err", data.controller)
        }
      />
    </div>
  );
};

export default DropdownGroup;
