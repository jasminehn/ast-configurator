/*
  Checkbox.tsx
  A checkbox with some pizzaz.
*/
import styles from "./Checkbox.module.css";

// "fixed" aligns box to flex-start, just useful for some stuff.
interface CheckboxProps {
  checked: boolean;
  fixed: boolean;
  onClick: () => void;
  dataCy?: string
  // optional parameter for hard-styling a checkbox
  indeterminate?: boolean;
}

const Checkbox = ({ checked, fixed, onClick, dataCy, indeterminate }: CheckboxProps) => {
  return (
    <div className={checked ? styles.checked : styles.unchecked} data-cy={dataCy}>
    <div
      className={fixed ? `${styles.fixed} ${styles.cb}` : styles.cb}
      onClick={onClick}
      onKeyPress={onClick}
      role="checkbox"
      tabIndex={0}
      aria-checked={checked}
    >
      {checked && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ 
            // margin: "10px", 
            minWidth: "24px" }}
        >
          {!indeterminate ? <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.33333 2C3.49238 2 2 3.49238 2 5.33333V18.6667C2 20.5076 3.49238 22 5.33333 22H18.6667C20.5076 22 22 20.5076 22 18.6667V5.33333C22 3.49238 20.5076 2 18.6667 2H5.33333ZM10.4314 13.1769L7.29412 10.0396L5.33333 12.0004L10.4314 17.0985L18.6667 8.86314L16.7059 6.90234L10.4314 13.1769Z"
            fill="#7191D1"
            className={styles.check}
          /> : undefined}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            className={!indeterminate ? styles.minus : undefined}
            d="M5.33333 2C3.49238 2 2 3.49238 2 5.33333V18.6667C2 20.5076 3.49238 22 5.33333 22H18.6667C20.5076 22 22 20.5076 22 18.6667V5.33333C22 3.49238 20.5076 2 18.6667 2H5.33333ZM17.8233 13.3865L17.8233 10.6135L6.17714 10.6134L6.17677 13.3865L17.8233 13.3865Z"
            fill="#7191D1"
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
          style={{ 
            // margin: "10px", 
            minWidth: "24px" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.6667 4.13672H5.33333C4.59695 4.13672 4 4.73367 4 5.47005V18.8034C4 19.5398 4.59695 20.1367 5.33333 20.1367H18.6667C19.403 20.1367 20 19.5398 20 18.8034V5.47005C20 4.73367 19.403 4.13672 18.6667 4.13672ZM5.33333 2.13672C3.49238 2.13672 2 3.6291 2 5.47005V18.8034C2 20.6443 3.49238 22.1367 5.33333 22.1367H18.6667C20.5076 22.1367 22 20.6443 22 18.8034V5.47005C22 3.6291 20.5076 2.13672 18.6667 2.13672H5.33333Z"
            fill="#A6A6A6"
          />
        </svg>
      )}
    </div>
    </div>
  );
};

export default Checkbox;
