/*
  CheckOption.tsx
  An option next to a checkbox
*/

import Checkbox from "../Checkbox/Checkbox";
import styles from "../RadioOption/RadioOption.module.css";

interface RadioOptionProps {
  name: string;
  value: string;
  onClick: (name: string, value: string, controller: boolean) => void;
  disabled: boolean;
  checked: boolean;
  text: string;
  controller: boolean;
}

const CheckOption = ({
  name,
  value,
  onClick,
  disabled,
  checked,
  text,
  controller,
}: RadioOptionProps) => {
  if (disabled) {
    return (
      <div
        className={styles.disabled}
        onClick={() => onClick(name, value, controller)}
        onKeyDown={() => onClick(name, value, controller)}
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
      >
        <Checkbox
          checked={checked}
          onClick={() => onClick(name, value, controller)}
          fixed={false}
        />
        <div className={styles.label} style={{ opacity: 0.2 }}>
          {text}
        </div>
      </div>
    );
  }
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      onKeyPress={() => onClick(name, value, controller)}
      tabIndex={0}
      className={styles.wrapper}
      onClick={() => onClick(name, value, controller)}
      style={{alignItems: "center"}}
    >
      <Checkbox
        checked={checked}
        onClick={() => {}}
        fixed={false}
      />
      <div className={styles.label}>{text}</div>
    </div>
  );
};

export default CheckOption;
