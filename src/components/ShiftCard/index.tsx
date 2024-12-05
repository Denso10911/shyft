"use client"

import React, { useState } from "react"
import { shiftInterface } from "@/types"
import ConditionalRender from "@/components/ConditionalRender"
import Badge from "@/components/Badge"
import { shiftTypeColors, shiftTypeLabels } from "@/utiles/shiftTypeData"
import dayjs from "dayjs"
import { getFormatedDuration } from "@/utiles/getFormatedDuration"
import { getFormatedBreakPeriod } from "@/utiles/getFormatedBreakPeriod"
import { getFormatedSalaryAmount } from "@/utiles/getFormatedSalaryAmount"
import { FaRegClock } from "react-icons/fa"
import { FaRegPauseCircle } from "react-icons/fa"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import Checkbox from "@/components/Checkbox"

type Props = {
  data: shiftInterface
}

const ShiftCard: React.FC<Props> = ({ data }) => {
  const [isChecked, setIsChecked] = useState(false)

  const { start, end, salary, currency, shiftType, breakUnpaid } = data

  return (
    <div className="relative flex cursor-grab flex-col gap-1 rounded-[10px] bg-lime-100 p-4">
      <div className="absolute right-3 top-3">
        <Checkbox isChecked={isChecked} setIsChecked={setIsChecked} />
      </div>
      <div className="flex font-bold">
        {dayjs(start).format("H:mm")}-{dayjs(end).format("H:mm")}
      </div>
      <div className="text-color-dark-gray flex gap-2 text-sm">
        <p className="flex items-center gap-1">
          <FaRegClock /> {getFormatedDuration(start, end)}
        </p>
        <p className="flex items-center gap-1">
          <FaRegPauseCircle />
          {getFormatedBreakPeriod(breakUnpaid)}
        </p>
        <p className="flex items-center gap-1">
          <FaRegMoneyBillAlt /> {getFormatedSalaryAmount(+salary, currency)}
        </p>
      </div>
      <ConditionalRender value={shiftType}>
        <Badge
          label={shiftTypeLabels[shiftType]}
          background={shiftTypeColors[shiftType]}
          width="full"
        />
      </ConditionalRender>
    </div>
  )
}

export default React.memo(ShiftCard)
