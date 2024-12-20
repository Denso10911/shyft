"use client"

import React, { useState } from "react"
import { FaRegClock } from "react-icons/fa"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import { useTranslations } from "next-intl"

import Checkbox from "@/components/Checkbox"
import ShiftContextMenuContainer from "@/components/ShiftContextMenuContainer"

import useCalendarShiftContextMenu from "@/hooks/useCalendarShiftContextMenu"
import { shiftInterface } from "@/types"
import { getFormatedSalaryAmount } from "@/utiles/getFormatedSalaryAmount"
import { getMinutesToHHmm } from "@/utiles/getMinutesToHHmm"
import { shiftTypeLabels } from "@/utiles/shiftTypeData"

type Props = {
  data: shiftInterface
  salary: string
  currency: number
  setIsModalOpen: (value: boolean) => void
}

const AbsenceCard: React.FC<Props> = ({ data, salary, currency, setIsModalOpen }) => {
  const t = useTranslations("ShiftCard")
  const { contextMenu, handleRightClick, handleCloseContextMenu } = useCalendarShiftContextMenu()

  const [isChecked, setIsChecked] = useState(false)

  const { start, end, shiftType, id, shiftLength } = data

  return (
    <>
      <div
        onContextMenu={e => handleRightClick(e, id)}
        className={`relative z-0 flex h-max w-full cursor-grab flex-col overflow-hidden rounded-[10px] bg-transparent px-4 py-2 shadow transition hover:scale-105`}
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
          {shiftType && (
            <div className="flex text-2xl font-bold">
              {t(`labels.${shiftTypeLabels[shiftType]}`)}
            </div>
          )}

          {shiftLength && (
            <p className="flex items-center gap-1">
              <FaRegClock /> {getMinutesToHHmm(shiftLength)}
            </p>
          )}

          {salary && currency && (
            <p className="flex items-center gap-1">
              <FaRegMoneyBillAlt /> {getFormatedSalaryAmount(+salary, currency)}
            </p>
          )}
        </div>

        {shiftType && (
          <div className="text flex gap-2 text-lg capitalize text-color-dark-gray">
            {t(`badges.${shiftTypeLabels[shiftType]}`)}
          </div>
        )}
        {start && end && (
          <div className="flex text-sm text-color-dark-gray">{`${start} - ${end}`}</div>
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

export default React.memo(AbsenceCard)
