import styles from "./Button.module.css";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  label?: string;
  size?: "medium" | "small";
  fullwidth?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    variant = "primary",
    disabled = false,
    size = "medium",
    fullwidth = false,
  } = props;

  const classNames = `${styles.button} ${styles[variant]} ${
    fullwidth ? styles.fullwidth : ""
  }`;

  return (
    <button
      className={classNames}
      onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        disabled ? e.preventDefault() : props.onClick(e);
      }}
    >
      {props.label}
    </button>
  );
};
