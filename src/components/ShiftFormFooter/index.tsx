import React from "react"
import { useTranslations } from "next-intl"

import Button from "@/components/Button"

import { useShiftStore } from "@/store/shiftStore"
import { ShiftModalTypes } from "@/types/enums"

type Props = {
  exceedingHours: number
  closeHandler: () => void
}

const ShiftFormFooter: React.FC<Props> = ({ exceedingHours, closeHandler }) => {
  const t = useTranslations("Form")

  const { shiftModalType } = useShiftStore(state => state)

  return (
    <div className="mt-auto flex flex-col gap-2">
      {exceedingHours > 0 && (
        <ul className="mb-5 pl-10">
          <li className="list-disc text-sm">
            Exceeding the maximum weekly hours of 38h (+${exceedingHours.toFixed(0)} h)
          </li>
        </ul>
      )}

      <div className="flex justify-between gap-2">
        <Button type="button" variant="red" size="md" width="full" onClick={closeHandler} rounded>
          {t("buttons.cancel")}
        </Button>
        <Button type="submit" variant="green" size="md" width="full" rounded>
          {shiftModalType === ShiftModalTypes.CREATE
            ? t("buttons.addShift")
            : t("buttons.editShift")}
        </Button>
      </div>
    </div>
  )
}

export default React.memo(ShiftFormFooter)
