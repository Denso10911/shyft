import React from "react"
import { UseFormSetValue } from "react-hook-form"
import { useTranslations } from "next-intl"

import Button from "@/components/Button"

import { shiftInterface } from "@/types"
import { ShiftType, ShiftVariant } from "@/types/enums"

type Props = {
  setValue: UseFormSetValue<Omit<shiftInterface, "id">>
  shiftVariant: ShiftVariant
}

const ShiftFormTabs: React.FC<Props> = ({ setValue, shiftVariant }) => {
  const t = useTranslations("Form")

  return (
    <div className="flex gap-0 overflow-hidden rounded">
      <Button
        type="button"
        onClick={() => {
          setValue("shiftVariant", ShiftVariant.SHIFT)
          setValue("shiftType", ShiftType.CASH_REGISTER)
        }}
        size="sm"
        variant={shiftVariant === ShiftVariant.SHIFT ? "gray" : "light"}
        width="full"
      >
        {t("buttons.shift")}
      </Button>
      <Button
        type="button"
        onClick={() => {
          setValue("shiftVariant", ShiftVariant.ABSENCE)
          setValue("shiftType", ShiftType.VACATION)
        }}
        size="sm"
        variant={shiftVariant === ShiftVariant.ABSENCE ? "gray" : "light"}
        width="full"
      >
        {t("buttons.absence")}
      </Button>
    </div>
  )
}

export default React.memo(ShiftFormTabs)
