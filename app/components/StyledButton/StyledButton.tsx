/*
  StyledButton.tsx
  Easy-to-use navigation buttons, with style.
*/

import styles from "./StyledButton.module.css";

interface NavButtonProps {
  /** The text to display within */
  text: string;
  /** An id for the button */
  id: string;
  /** Whether to display an optional arrow on either side of the text */
  arrow?: "left" | "right";
  /** Action on press */
  onPress?: () => void;
  /** if `true`, button can be pressed */
  enabled: boolean;
  /** if `true`, button will be greyed out but still pressable */
  disabledTheme?: boolean;
}

const NavButton = ({
  text,
  id,
  arrow,
  onPress,
  enabled,
  disabledTheme,
}: NavButtonProps) => {
  return (
    <span
    /* An explanantion of the logic for className!
      1. Within the true branch of the ternary expression (when 'enabled' is true):
          - The existing ${styles.wrapper} class is included.
          - A nested ternary expression is used to determine the class for the arrow side based on the 'arrow' and 'id' values:
            - If 'arrow' is "left" or not provided (!arrow), it checks if 'id' is "launchOnAWS". If true, it adds the 'styles.launchButton' class; otherwise, it adds the 'styles.backButton' class (which is the default white button).
            - If 'arrow' is not "left" and 'id' is not "launchOnAWS", an empty string is added (no additional class).
      2. In the false branch of the ternary expression (when 'enabled' is false):
          - It simply adds both the ${styles.disabled} and ${styles.wrapper} classes.
    */
      className={
        enabled 
          ? `${styles.wrapper} ${(arrow === "left" || !arrow) ? (id === "launchOnAWS" ? styles.launchButton : styles.backButton) : ""}` 
          : `${styles.disabled} ${styles.wrapper}`
      }
      role="button"
      tabIndex={0}
      onClick={onPress}
      onKeyPress={onPress}
      style={{
        cursor: "pointer",
        filter: disabledTheme || !enabled ? "grayscale(100)" : undefined,
      }}
      data-cy={`button-${id}`}
    >
      {/* {arrow == "left" && (
        <svg
          className={styles.rpad}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.7912 11.7312H7.62124L12.5012 6.85116C12.8912 6.46116 12.8912 5.82116 12.5012 5.43116C12.3144 5.2439 12.0608 5.13867 11.7962 5.13867C11.5317 5.13867 11.2781 5.2439 11.0912 5.43116L4.50124 12.0212C4.11124 12.4112 4.11124 13.0412 4.50124 13.4312L11.0912 20.0212C11.4812 20.4112 12.1112 20.4112 12.5012 20.0212C12.8912 19.6312 12.8912 19.0012 12.5012 18.6112L7.62124 13.7312H18.7912C19.3412 13.7312 19.7912 13.2812 19.7912 12.7312C19.7912 12.1812 19.3412 11.7312 18.7912 11.7312Z"
            fill="#000000"
          />
        </svg>
      )} */}
      <div className={styles.label}>{text}</div>
      {/* {arrow == "right" && (
        <svg
          className={styles.lpad}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.20874 13.0007H16.3787L11.4987 17.8807C11.1087 18.2707 11.1087 18.9107 11.4987 19.3007C11.8887 19.6907 12.5187 19.6907 12.9087 19.3007L19.4987 12.7107C19.8887 12.3207 19.8887 11.6907 19.4987 11.3007L12.9187 4.70069C12.7319 4.51344 12.4783 4.4082 12.2137 4.4082C11.9492 4.4082 11.6956 4.51344 11.5087 4.70069C11.1187 5.09069 11.1187 5.72069 11.5087 6.11069L16.3787 11.0007H5.20874C4.65874 11.0007 4.20874 11.4507 4.20874 12.0007C4.20874 12.5507 4.65874 13.0007 5.20874 13.0007Z"
            fill="#000000"
          />
        </svg>
      )} */}
      {id == "launchOnAWS" && (
        <div className={styles.arrowRightContainer}>
          <svg
          className={styles.arrowRight}
          width="26"
          height="26"
          viewBox="0 0 448 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          >
          <path
              d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z"
              fill="#F64137"
          />
          </svg>
        </div>
      )}
      
    </span>
  );
};

export default NavButton;
