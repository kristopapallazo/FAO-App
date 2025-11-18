import type { FC, InputHTMLAttributes } from "react";
import classes from "./Input.module.css";
import { SearchIcon } from "../../../../icons";

interface SearchInputProps {
  icon?: React.ReactNode;
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  style?: React.CSSProperties;
  width?: number;
}

const SearchInput: FC<SearchInputProps> = ({
  placeholder = "Search...",
  value = "",
  icon = <SearchIcon />,
  onChange,
  width = 263,
  style = {},
}) => {
  const handleChange: InputHTMLAttributes<HTMLInputElement>["onChange"] = (
    e
  ) => {
    const value = e.target.value;
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={classes.search_input_wrapper} style={{ width, ...style }}>
      {icon && <span className={classes.search_icon}>{icon}</span>}
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        className={classes.search_input}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
