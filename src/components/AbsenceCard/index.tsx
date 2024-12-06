"use client"

import React, { useState } from "react"
import { shiftInterface } from "@/types"
import { shiftTypeLabels } from "@/utiles/shiftTypeData"
import { getFormatedDuration } from "@/utiles/getFormatedDuration"
import { getFormatedBreakPeriod } from "@/utiles/getFormatedBreakPeriod"
import { getFormatedSalaryAmount } from "@/utiles/getFormatedSalaryAmount"
import { FaRegClock } from "react-icons/fa"
import { FaRegPauseCircle } from "react-icons/fa"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import Checkbox from "@/components/Checkbox"
import { useTranslations } from "next-intl"
import ConditionalRender from "@/components/ConditionalRender"
import dayjs from "dayjs"

type Props = {
  data: shiftInterface
  onContextMenu: (e: React.MouseEvent, id: number) => void
}

const AbsenceCard: React.FC<Props> = ({ data, onContextMenu }) => {
  const t = useTranslations("ShiftCard")

  const [isChecked, setIsChecked] = useState(false)

  const { start, end, salary, currency, shiftType, breakUnpaid, id } = data

  return (
    <div
      onContextMenu={e => onContextMenu(e, id)}
      className={`relative z-0 flex h-max w-full cursor-grab flex-col overflow-hidden rounded-[10px] bg-transparent px-4  py-2 shadow`}
    >
      {/*card background*/}
      <div className="absolute left-[-20px] top-[-20px] z-[-1] flex h-[150%] w-[120%] justify-between gap-3 bg-[#f9faff]">
        {new Array(10).fill("").map((_, i) => {
          return <div key={i} className="h-full w-3 rotate-[30deg] bg-[#f1f2f7]" />
        })}
      </div>

      <div className="absolute right-3 top-3">
        <Checkbox isChecked={isChecked} setIsChecked={setIsChecked} />
      </div>

      <div className="flex gap-2 text-sm text-color-dark-gray">
        <div className="flex text-2xl font-bold">{t(`labels.${shiftTypeLabels[shiftType]}`)}</div>

        <ConditionalRender value={start && end}>
          <p className="flex items-center gap-1">
            <FaRegClock /> {getFormatedDuration(start, end)}
          </p>
        </ConditionalRender>

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

      <div className="text flex gap-2 text-lg capitalize text-color-dark-gray">
        {t(`badges.${shiftTypeLabels[shiftType]}`)}
      </div>
      {start && end && (
        <div className="flex text-sm text-color-dark-gray">
          {dayjs(start).format("H:mm")}-{dayjs(end).format("H:mm")}
        </div>
      )}
    </div>
  )
}

export default React.memo(AbsenceCard)
