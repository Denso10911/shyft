import React from "react"
import { FaRegCopy } from "react-icons/fa"
import { FaAlignJustify } from "react-icons/fa"
import { FaTimesCircle } from "react-icons/fa"
import cn from "classnames"
import { useTranslations } from "next-intl"

const ShiftContextMenu = () => {
  const t = useTranslations("ShiftContextMenu")

  const handleCopyClick = () => {}
  const handleEditClick = () => {}
  const handleDeleteClick = () => {}

  const menuItems = [
    { title: t("copy"), icon: <FaRegCopy />, onClick: handleCopyClick },
    { title: t("edit"), icon: <FaAlignJustify />, onClick: handleEditClick },
    { title: t("delete"), icon: <FaTimesCircle />, onClick: handleDeleteClick },
  ]

  return (
    <div className="flex w-60 flex-col gap-2 rounded bg-color-white py-4 shadow">
      {menuItems.map((item, index) => {
        return (
          <div
            key={index}
            className={cn(
              "flex origin-left cursor-pointer items-center gap-2 px-4 py-1 transition hover:scale-105",
              index === 2 && "text-color-red"
            )}
            onClick={item.onClick}
          >
            <div>{item.icon}</div>
            <div>{item.title}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ShiftContextMenu
