/*
  RadioOption.tsx
  Accessible styled functional radio buttons
*/

import styles from "./RadioOption.module.css";

interface RadioOptionProps {
  name: string;
  value: string;
  onClick: (name: string, value: string, controller: boolean) => void;
  disabled: boolean;
  checked: boolean;
  text: string;
  controller: boolean;
}

const RadioOption = ({
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
      <div className={styles.disabled}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12Z"
            fill="#DADADA"
          />
        </svg>
        <div className={styles.label} style={{ opacity: 0.2 }}>
          {text}
        </div>
      </div>
    );
  }
  return (
    <div
      role="radio"
      aria-checked={checked}
      onKeyPress={() => onClick(name, value, controller)}
      tabIndex={0}
      className={styles.wrapper}
      onClick={() => onClick(name, value, controller)}
      data-cy={`radio-${name}-${value}`}
    >
      {checked && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.checked}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z"
            fill="#0D99FF"
          />
        </svg>
      )}
      {!checked && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.unchecked}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12Z"
            fill="#A6A6A6"
          />
        </svg>
      )}
      <div className={styles.label}>{text}</div>
    </div>
  );
};

export default RadioOption;
