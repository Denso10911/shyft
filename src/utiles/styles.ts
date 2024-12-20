import { CSSObjectWithLabel } from "react-select"

export const timePickerStyles = {
  backgroundColor: "#F4F4F5",
  boxShadow: "0 0 0 1px #E9E9EA",
  fontSize: 14,
  width: "100%",
  padding: "8px 8px",
  color: "#283149",
  outline: "none",
  borderRadius: 4,
  height: "40px",
}

export const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(119,119,119,0.75)",
    zIndex: "30",
  },
  content: {
    top: "0",
    right: "0",
    left: "auto",
    bottom: "auto",
    width: "500px",
    height: "100%",
    padding: "0",
    borderRadius: "0",
  },
}

export const selectStyles = {
  control: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    border: "none",
    minHeight: "40px",
    borderRadius: "2px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#F4F4F5",
    boxShadow: "0 0 0 1px #E9E9EA",
    ":active": {
      border: "none",
    },
  }),
  option: (baseStyles: CSSObjectWithLabel, state: any) => ({
    ...baseStyles,
    backgroundColor: state.isSelected ? "#F4F4F5" : state.isFocused ? "#F4F4F5" : "white",
    color: state.isFocused ? "black" : "inherit",
    cursor: "pointer",
    ":active": {
      ...baseStyles[":active"],
      backgroundColor: state.isSelected ? "#e9e9ea" : "F4F4F5",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  placeholder: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "#a0a0ae",
  }),
}
