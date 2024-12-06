import React from "react"
import { useDroppable } from "@dnd-kit/core"
import cn from "classnames"

type Props = {
  children: React.ReactNode
  id: number | string
  className?: string
}

const Droppable: React.FC<Props> = ({ children, id, className }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  })

  return (
    <div ref={setNodeRef} className={cn(className, isOver && "bg-color-light-gray")}>
      {children}
    </div>
  )
}

export default Droppable
