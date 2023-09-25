/**
 * TextInput.tsx
 * A controlled, styled textbox
 */

import styles from "./TextInput.module.css";

interface TextInputProps {
  id: string;
  value: string;
  onChange: (id: string, val: string, controller: boolean) => void;
  placeholder?: string;
  disabled: boolean;
  controller: boolean;
  error: boolean
}

const TextInput = ({
  id,
  value,
  onChange,
  placeholder,
  disabled,
  controller,
  error
}: TextInputProps) => {
  return (
    <input
      className={styles.input}
      style={{opacity: disabled ? 0.2 : undefined, borderColor: error ? "red" : undefined}}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={({ target: { value } }) => onChange(id, value, controller)}
      disabled={disabled}
      data-cy={`textinput-${id}`}
    />
  );
};

export default TextInput;
