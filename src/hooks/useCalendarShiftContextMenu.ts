import React, { useState } from "react"

type ContextMenu = {
  visible: boolean
  x: number
  y: number
  id: number | null
}

const useCalendarShiftContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<ContextMenu>({
    visible: false,
    x: 0,
    y: 0,
    id: null,
  })

  const handleRightClick = (event: React.MouseEvent, id: number) => {
    event.preventDefault() // Відключаємо стандартне меню браузера
    setContextMenu({
      visible: true,
      x: event.pageX,
      y: event.pageY,
      id,
    })
  }

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, id: null })
  }

  return { contextMenu, handleRightClick, handleCloseContextMenu }
}

export default useCalendarShiftContextMenu
