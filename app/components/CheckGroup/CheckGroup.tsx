/**
 * CheckGroup.tsx
 * A group of checkboxes with managed state
 */

import { useMemo } from "react";
import CheckOption from "../CheckOption/CheckOption";
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

export const CheckGroup = ({
  data,
  value,
  onInputChange,
  attempted,
}: CheckGroupProps) => {
  // Parse checkbox value
  const trueVal = useMemo(() => JSON.parse(value) as Array<string>, [value]);
  return (
    <div className={styles.radiogroup}>
      {data.options.map((o, idx) => (
        <CheckOption
          key={idx}
          name={data.id}
          text={o.name}
          value={o.value}
          checked={trueVal.includes(o.value)}
          onClick={(name, string, controller) =>
            // Rather than just use the value of the checkbox, either remove or add checkbox index to checkbox val array.
            onInputChange(
              name,
              JSON.stringify(
                trueVal.includes(o.value)
                  ? trueVal.filter((v) => v != o.value)
                  : trueVal.slice().concat(o.value)
              ),
              controller
            )
          }
          disabled={false}
          controller={data.controller}
        />
      ))}
    </div>
  );
};

export default CheckGroup;
