import React from "react"
import { COLORS } from "@/utiles/colors"

const colorVariants = {
  WHITE: "bg-color-white text-color-black",
  BLUE: "bg-color-blue text-color-black",
  BLACK: "bg-color-black text-color-white",
  DARK_GRAY: "bg-color-dark-gray text-color-white",
  GRAY: "bg-color-gray text-color-black",
  RED: "bg-color-red text-color-white",
  GREEN: "bg-color-green text-color-black",
  YELLOW: "bg-color-yellow text-color-black",
  LIGHT_YELLOW: "bg-color-light-yellow text-color-black",
  LIGHT_GRAY: "bg-color-light-gray text-color-black",
  LIGHT_BLUE: "bg-color-light-blue text-color-black",
  LIGHT_GREEN: "bg-color-light-green text-color-black",
  LIGHT_RED: "bg-color-light-red text-color-black",
  TRANSPARENT: "transparent text-color-gray",
}

const widthVariants = {
  full: "w-full",
  max: "w-max",
}

type Props = {
  label: string
  background: keyof typeof COLORS
  width: "full" | "max"
}

const Badge: React.FC<Props> = ({ label, background, width }) => {
  return (
    <div
      className={`${colorVariants[background]} ${widthVariants[width]} rounded-[8px] px-2 py-1 text-sm font-medium capitalize`}
    >
      {label}
    </div>
  )
}

export default Badge
