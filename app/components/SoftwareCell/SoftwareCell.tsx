/*
  SoftwareCell.tsx
  A single cell within the SoftwareSelector.
*/

import { useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import DropdownIcon from "../DropdownIcon/DropdownIcon";
import { Software } from "../SoftwareSelector/types";
import styles from "./SoftwareCell.module.css";

interface SoftwareCellProps {
  data: Software;
  checked: boolean;
  onCheck: () => void;
}

const SoftwareCell = ({ data, checked, onCheck }: SoftwareCellProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={styles.cell}>
      <div style={{margin: "10px 10px 10px 10px"}}>
      <Checkbox checked={checked} fixed={true} onClick={onCheck} dataCy={`checkbox-${data.id}`}/>
      </div>
      <div
        style={{
          flex: 1,
          minHeight: "44px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className={styles.dropdown}>
          <div className={styles.dropdowntag}>
            {data.name}
            <DropdownIcon
              open={open}
              id={data.id}
              onClick={() => {
                setOpen(!open);
              }}
            />
          </div>
          {open && (
            <p className={styles.description}>{data.description.text}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoftwareCell;
