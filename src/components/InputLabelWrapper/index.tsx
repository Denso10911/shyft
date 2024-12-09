import React from "react"
import cn from "classnames"

type Props = {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
  required?: boolean
}
const InputLabelWrapper: React.FC<Props> = ({ label, error, children, className, required }) => {
  return (
    <label className={cn(className, "flex flex-col gap-1 text-sm font-medium text-gray-700")}>
      <span className="text-m flex gap-1 font-bold">
        {required && <span className="text-red-500">*</span>}
        {label}
      </span>
      {children}
      {error && <p className="text-xs text-color-red">{error}</p>}
    </label>
  )
}

export default InputLabelWrapper
