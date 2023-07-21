import styles from "./Input.module.css";
import { useId } from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  const {
    type = "text",
    disabled = false,
    label,
    placeholder,
    value,
    error,
    onChange,
  } = props;

  const inputId = useId();

  const inputClasses = `${styles.input} ${disabled && styles.disabled} ${
    error && styles.error
  }`;

  return (
    <div className={styles.inputWrapper}>
      {label ? <label htmlFor={inputId}>{label}</label> : null}
      <input
        className={inputClasses}
        value={value}
        id={inputId}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};
