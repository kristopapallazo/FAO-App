import type { FC, ChangeEvent } from "react";
import classes from "./Select.module.css";
import clsx from "clsx";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  width?: string;
  wrapperStyle?: React.CSSProperties;
  selectStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  variant?: "primary" | "secondary";
}

const Select: FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Please select",
  disabled = false,
  className = "",
  label,
  width,
  wrapperStyle = {},
  selectStyle = {},
  labelStyle = {},
  variant = "secondary",
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  const selectClassName = clsx(classes.select, {
    [classes.secondary]: variant === "secondary",
  });

  return (
    <div
      className={`${classes.select_wrapper} ${className}`}
      style={wrapperStyle}
    >
      {label && (
        <label className={classes.label} style={labelStyle}>
          {label}
        </label>
      )}
      <select
        className={selectClassName}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        style={{ width, ...selectStyle }}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map(({ value, label, disabled }, idx) => (
          <option key={`${value}-${idx}`} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
