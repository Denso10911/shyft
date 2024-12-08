import React from "react"
import { useDraggable } from "@dnd-kit/core"
import cn from "classnames"

type Props = {
  children: React.ReactNode
  id: number | string
}

const Draggable: React.FC<Props> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, transform, active } = useDraggable({
    id,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  const isActive = active && active.id === id

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(isActive ? "z-10 cursor-grabbing" : " cursor-grab", "text-start")}
    >
      {children}
    </button>
  )
}

export default Draggable
