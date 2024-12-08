"use client"

import React, { useState } from "react"
import { FaRegClock, FaRegMoneyBillAlt, FaRegPauseCircle } from "react-icons/fa"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"

import Badge from "@/components/Badge"
import Checkbox from "@/components/Checkbox"

import { shiftInterface } from "@/types"
import { ShiftType } from "@/types/enums"
import { getFormatedBreakPeriod } from "@/utiles/getFormatedBreakPeriod"
import { getFormatedDuration } from "@/utiles/getFormatedDuration"
import { getFormatedSalaryAmount } from "@/utiles/getFormatedSalaryAmount"
import { getMinutesToHHmm } from "@/utiles/getMinutesToHHmm"
import { shiftTypeColors, shiftTypeLabels } from "@/utiles/shiftTypeData"

type Props = {
  data: shiftInterface
  onContextMenu?: (e: React.MouseEvent, id: string) => void
  salary: string
  currency: number
}

const ShiftCard: React.FC<Props> = ({ data, onContextMenu, salary, currency }) => {
  const t = useTranslations("ShiftCard")

  const [isChecked, setIsChecked] = useState(false)

  const { start, end, shiftType, breakUnpaid, id, shiftLength } = data

  const backgroundColor =
    data.shiftType === ShiftType.CLOSURE || !data.shiftType
      ? "bg-[#f9faff]"
      : "bg-color-light-green"

  return (
    <div
      onContextMenu={e => onContextMenu && onContextMenu(e, id)}
      className={`${backgroundColor} relative flex h-max w-full origin-center flex-col  gap-1 rounded-[10px] px-4 py-2 shadow transition hover:scale-105`}
    >
      <div className="absolute right-3 top-3">
        <Checkbox isChecked={isChecked} setIsChecked={setIsChecked} />
      </div>

      <div className="flex font-bold">{`${start} - ${end}`}</div>

      <div className="flex gap-2 text-sm text-color-dark-gray">
        {shiftLength && (
          <p className="flex items-center gap-1">
            <FaRegClock /> {getMinutesToHHmm(shiftLength)}
          </p>
        )}

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

      {!!shiftType && (
        <Badge
          label={t(`badges.${shiftTypeLabels[shiftType]}`)}
          background={shiftTypeColors[shiftType]}
          width="full"
        />
      )}
    </div>
  )
}

export default React.memo(ShiftCard)
