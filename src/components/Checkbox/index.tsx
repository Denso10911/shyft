import React, { Dispatch, SetStateAction } from "react"
import cn from "classnames"
import { FaCheck } from "react-icons/fa"

interface Props {
  isChecked: boolean
  setIsChecked: Dispatch<SetStateAction<boolean>>
  label?: string
}

const Checkbox: React.FC<Props> = ({ isChecked, setIsChecked, label }) => {
  const checkboxConfig = {
    checked: {
      opacity: "opacity-1",
      border: "border-color-light-gray dark:border-color-white",
    },
    unchecked: {
      opacity: "opacity-0",
      border: "border-color-light-gray",
    },
  }

  return (
    <div
      className="flex cursor-pointer items-center gap-2"
      onClick={() => setIsChecked(!isChecked)}
    >
      <div
        className={cn(
          "flex shrink-0 rounded border bg-color-white shadow",
          isChecked ? checkboxConfig.checked.border : checkboxConfig.unchecked.border
        )}
      >
        <div
          className={cn(
            "flex h-[14px] w-[14px] items-center justify-center duration-150",
            isChecked ? checkboxConfig.checked.opacity : checkboxConfig.unchecked.opacity
          )}
        >
          <FaCheck size={10} />
        </div>
      </div>
      {label && <div className="select-none text-sm">{label}</div>}
    </div>
  )
}

export default Checkbox
