import React from "react"
import Badge from "@/components/Badge"
import { COLORS } from "@/utiles/colors"

type ColorKey = keyof typeof COLORS

const Components = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl">Badges</h2>
        <div className="grid grid-cols-1 gap-1">
          <Badge label="full width" background={"GREEN"} width="full" />
          <Badge label="full width" background={"WHITE"} width="full" />
          <div className="flex flex-wrap gap-1">
            {Object.keys(COLORS).map((color, index) => {
              return (
                <Badge key={index} label="max content" background={color as ColorKey} width="max" />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Components
