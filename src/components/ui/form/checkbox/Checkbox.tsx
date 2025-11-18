import type { FC } from "react";
import classes from "./Checkbox.module.css";
import { CheckIcon } from "../../../../icons";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ label, checked = false, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <span className={classes.checkbox_wrapper}>
      <label className={classes.checkbox_container}>
        <input
          type="checkbox"
          className={classes.checkbox}
          checked={checked}
          onChange={handleChange}
        />
        <span className={classes.checkbox_icon}>
          <CheckIcon />
        </span>
      </label>
      {label && <span className={classes.label}>{label}</span>}
    </span>
  );
};

export default Checkbox;
