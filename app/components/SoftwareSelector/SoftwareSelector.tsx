/*
  SoftwareSelector.tsx
  The software display + selection component. Controlled by parent.
*/

import { useMemo } from "react";
import { Condition } from "../../state/types";
import Checkbox from "../Checkbox/Checkbox";
import SoftwareCell from "../SoftwareCell/SoftwareCell";
import styles from "./SoftwareSelector.module.css";
import { Software } from "./types";

export const errSoftware: Software = {
  id: "ERR",
  name: "ERR: Error in software.json configuration.",
  description: {
    text: "ERR",
  },
  conditions: [] as Array<Condition>
};

interface SoftwareSelectorProps {
  software: Software[];
  selected: { id: string; state: boolean | undefined }[];
  onCheck: (id: string) => void;
  allCheck: boolean;
  onAllCheck: () => void;
}

const SoftwareSelector = ({
  software,
  selected,
  onCheck,
  allCheck,
  onAllCheck,
}: SoftwareSelectorProps) => {
  // Calculate if the top checkbox should be a check or indeterminate (-)
  const indeterminate = useMemo(() => selected.reduce((acc, b) => acc + (b.state ? 1 : 0), 0) != software.length, [selected, software.length])
  return (
    <div className={styles.table}>
      <div className={styles.theader}>
        <div style={{ margin: "10px 10px 10px 10px" }}>
          <Checkbox checked={allCheck} fixed={true} onClick={onAllCheck} dataCy="checkbox-all" indeterminate={indeterminate}/>
        </div>
        <p>Select All</p>
      </div>
      <div className={styles.tcontents}>
        {software.map((s, idx) => (
          <SoftwareCell
            data={s}
            checked={selected.find((sel) => sel.id === s.id)?.state ?? false}
            onCheck={() => onCheck(s.id)}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default SoftwareSelector;
