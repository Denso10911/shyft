import React from "react"
import cn from "classnames"

const variantStyles = {
  red: "bg-[#fa4d50] text-color-white",
  green: "bg-[#30a653] text-color-white",
  gray: "bg-[#e3e6f1] text-color-black",
  light: "bg-color-white border border-[#f2f2f2] text-[#87888b]",
}

const sizeStyles = {
  sm: "px-2 py-1",
  md: "px-4 py-2",
}

const widthStyles = {
  full: "w-full",
  max: "w-max",
}

type Props = {
  type: "submit" | "button"
  variant: "red" | "green" | "gray" | "light"
  rounded?: boolean
  size: "sm" | "md"
  width: "full" | "max"
  onClick?: () => void
  children: React.ReactNode
}

const Button: React.FC<Props> = ({
  type,
  variant = "green",
  size = "md",
  width = "max",
  onClick,
  rounded,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "block font-medium",
        variantStyles[variant],
        sizeStyles[size],
        widthStyles[width],
        rounded && "rounded"
      )}
    >
      {children}
    </button>
  )
}

export default Button
