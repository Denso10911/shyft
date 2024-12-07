import React, { useState } from "react"

type ContextMenu = {
  visible: boolean
  x: number
  y: number
  id: string
}

const useCalendarShiftContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<ContextMenu>({
    visible: false,
    x: 0,
    y: 0,
    id: "",
  })

  const handleRightClick = (event: React.MouseEvent, id: string) => {
    event.preventDefault() // Відключаємо стандартне меню браузера
    setContextMenu({
      visible: true,
      x: event.pageX,
      y: event.pageY,
      id,
    })
  }

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, id: "" })
  }

  return { contextMenu, handleRightClick, handleCloseContextMenu }
}

export default useCalendarShiftContextMenu
