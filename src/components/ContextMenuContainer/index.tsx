import React, { useRef } from "react"

import useOnClickOutside from "@/hooks/useOnClickOutside"

type Props = {
  top: number
  left: number
  children: React.ReactNode
  handleClose: () => void
}

const ContextMenuContainer: React.FC<Props> = ({ top, left, children, handleClose }) => {
  const contextRef = useRef<HTMLDivElement>(null)
  const handleCloseContextMenu = () => handleClose()

  useOnClickOutside(contextRef, handleCloseContextMenu)

  return (
    <div
      ref={contextRef}
      className="absolute z-20"
      style={{
        top: `${top + 10}px`,
        left: `${left + 10}px`,
      }}
    >
      {children}
    </div>
  )
}

export default ContextMenuContainer
