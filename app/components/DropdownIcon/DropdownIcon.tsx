/*
  DropdownIcon.tsx
  Toggleable icon to open dropdown.
*/

import styles from "./DropdownIcon.module.css";

interface DropdownIconProps {
  open: boolean;
  id: string;
  onClick: (id: string) => void;
}

const DropdownIcon = ({ open, id, onClick }: DropdownIconProps) => {
  if (open) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={e => onClick(id)}
        onKeyPress={e => onClick(id)}
        tabIndex={0}
        className={styles.icon}
      >
        <path
          d="M11.2946 8.99953L6.70461 13.5895C6.31461 13.9795 6.31461 14.6095 6.70461 14.9995C7.09461 15.3895 7.72461 15.3895 8.11461 14.9995L12.0046 11.1195L15.8846 14.9995C16.2746 15.3895 16.9046 15.3895 17.2946 14.9995C17.6846 14.6095 17.6846 13.9795 17.2946 13.5895L12.7046 8.99953C12.3246 8.60953 11.6846 8.60953 11.2946 8.99953Z"
          fill="#A6A6A6"
        />
      </svg>
    );
  } else {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={e => onClick(id)}
        onKeyPress={e => onClick(id)}
        tabIndex={0}
        className={styles.icon}
      >
        <path
          d="M15.8746 8.99952L11.9946 12.8795L8.11461 8.99952C7.92778 8.81226 7.67413 8.70703 7.40961 8.70703C7.14509 8.70703 6.89144 8.81226 6.70461 8.99952C6.31461 9.38952 6.31461 10.0195 6.70461 10.4095L11.2946 14.9995C11.6846 15.3895 12.3146 15.3895 12.7046 14.9995L17.2946 10.4095C17.6846 10.0195 17.6846 9.38952 17.2946 8.99952C16.9046 8.61952 16.2646 8.60952 15.8746 8.99952Z"
          fill="#A6A6A6"
        />
      </svg>
    );
  }
};

export default DropdownIcon;
