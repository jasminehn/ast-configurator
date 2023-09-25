/**
 * Section.tsx
 * Displays a full Section for a user to answer.
 */

import Question from "../Question/Question";
import styles from "./Section.module.css";
import type { Section as SectionData } from "./types";


interface ISection {
  /** The name/id of the section, defined in groups.config.js */
  name: string,
  /** The data for the section */
  data: SectionData
  /** All the responses that the user has given for the questions */
  values: string[]
  /** A function to call whenever one of the inputs changes */
  onUpdate: (idx: number, value: string, controller: boolean) => void
  /** The group that the section belongs to */
  group: string
  /** Whether the user has attempted to submit the section */
  attempted: boolean
}

const Section = ({ name, data, values, onUpdate, group, attempted}: ISection) => {
  return (
    <div>
      <div className={styles.ul}>
        {data.questions.map((q, idx) => (
          <Question
            key={q.id}
            data={q}
            value={values[idx]}
            onInputChange={(_, value, _c) => onUpdate(idx, value, q.controller)}
            number={idx + 1}
            attempted={attempted}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
