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
import { FaRegClock, FaRegMoneyBillAlt, FaRegPauseCircle } from "react-icons/fa"
import Checkbox from "@/components/Checkbox"
import { useTranslations } from "next-intl"
import { ShiftType } from "@/types/enums"

type Props = {
  data: shiftInterface
  onContextMenu?: (e: React.MouseEvent, id: number) => void
}

const ShiftCard: React.FC<Props> = ({ data, onContextMenu }) => {
  const t = useTranslations("ShiftCard")

  const [isChecked, setIsChecked] = useState(false)

  const { start, end, salary, currency, shiftType, breakUnpaid, id } = data

  const backgroundColor =
    data.shiftType === ShiftType.CLOSURE ? "bg-[#f9faff]" : "bg-color-light-green"

  return (
    <div
      onContextMenu={e => onContextMenu && onContextMenu(e, id)}
      className={`${backgroundColor} relative flex h-max w-full origin-center flex-col  gap-1 rounded-[10px] px-4 py-2 shadow transition hover:scale-105`}
    >
      <div className="absolute right-3 top-3">
        <Checkbox isChecked={isChecked} setIsChecked={setIsChecked} />
      </div>

      <div className="flex font-bold">
        {dayjs(start).format("H:mm")}-{dayjs(end).format("H:mm")}
      </div>

      <div className="flex gap-2 text-sm text-color-dark-gray">
        <p className="flex items-center gap-1">
          <FaRegClock /> {getFormatedDuration(start, end)}
        </p>

        {breakUnpaid && (
          <p className="flex items-center gap-1">
            <FaRegPauseCircle />
            {getFormatedBreakPeriod(breakUnpaid)}
          </p>
        )}

        {salary && currency && (
          <p className="flex items-center gap-1">
            <FaRegMoneyBillAlt /> {getFormatedSalaryAmount(+salary, currency)}
          </p>
        )}
      </div>

      <ConditionalRender value={shiftType}>
        <Badge
          label={t(`badges.${shiftTypeLabels[shiftType]}`)}
          background={shiftTypeColors[shiftType]}
          width="full"
        />
      </ConditionalRender>
    </div>
  )
}

export default React.memo(ShiftCard)
