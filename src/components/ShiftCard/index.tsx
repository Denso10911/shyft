"use client"

import React, { useState } from "react"
import { FaRegClock, FaRegMoneyBillAlt, FaRegPauseCircle } from "react-icons/fa"
import { useTranslations } from "next-intl"

import Badge from "@/components/Badge"
import Checkbox from "@/components/Checkbox"
import ShiftContextMenuContainer from "@/components/ShiftContextMenuContainer"

import useCalendarShiftContextMenu from "@/hooks/useCalendarShiftContextMenu"
import { shiftInterface } from "@/types"
import { ShiftType } from "@/types/enums"
import { getFormatedBreakPeriod } from "@/utiles/getFormatedBreakPeriod"
import { getFormatedSalaryAmount } from "@/utiles/getFormatedSalaryAmount"
import { getMinutesToHHmm } from "@/utiles/getMinutesToHHmm"
import { shiftTypeColors, shiftTypeLabels } from "@/utiles/shiftTypeData"

type Props = {
  data: shiftInterface
  salary: string
  currency: number
  setIsModalOpen: (value: boolean) => void
}

const ShiftCard: React.FC<Props> = ({ data, salary, currency, setIsModalOpen }) => {
  const t = useTranslations("ShiftCard")
  const { contextMenu, handleRightClick, handleCloseContextMenu } = useCalendarShiftContextMenu()

  const [isChecked, setIsChecked] = useState(false)

  const { start, end, shiftType, breakUnpaid, id, shiftLength, isShiftCompensated } = data

  const backgroundColor =
    data.shiftType === ShiftType.CLOSURE || !data.shiftType
      ? "bg-[#f9faff]"
      : "bg-color-light-green"

  return (
    <>
      <div
        onContextMenu={e => handleRightClick(e, id)}
        className={`${backgroundColor} relative flex h-max w-full origin-center flex-col gap-1 rounded-[10px] px-4 py-2 shadow transition hover:scale-105`}
      >
        <div className="absolute right-3 top-3">
          <Checkbox isChecked={isChecked} setIsChecked={setIsChecked} />
        </div>

        <div className="flex font-bold">{`${start} - ${end}`}</div>

        <div className="flex gap-2 text-sm text-color-dark-gray">
          {!!shiftLength && (
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

          {salary && currency && isShiftCompensated && (
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
      <ShiftContextMenuContainer
        contextMenu={contextMenu}
        handleCloseContextMenu={handleCloseContextMenu}
        setIsModalOpen={setIsModalOpen}
        data={data}
      />
    </>
  )
}

export default React.memo(ShiftCard)
