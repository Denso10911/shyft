import React, { useState } from "react"
import { Control, Controller, FieldErrors, UseFormSetValue } from "react-hook-form"
import Select from "react-select"
import TimeField from "react-simple-timefield"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

import Checkbox from "@/components/Checkbox"
import InputLabelWrapper from "@/components/InputLabelWrapper"

import { getUsersOptions } from "@/api/users"
import { shiftInterface, userInterface } from "@/types"
import { ShiftTimingOptions, ShiftVariant } from "@/types/enums"
import {
  absenceTypeOptions,
  attributesOptions,
  competenciesOptions,
  mockUserOptions,
  shiftTimingOptions,
  shiftTypeOptions,
  specialCodeOptions,
} from "@/utiles/dummyContents"
import { getHHmmToMinutes } from "@/utiles/getHHmmToMinutes"
import { getMinutesToHHmm } from "@/utiles/getMinutesToHHmm"
import { selectStyles, timePickerStyles } from "@/utiles/styles"

type Props = {
  setValue: UseFormSetValue<Omit<shiftInterface, "id">>
  shiftVariant: ShiftVariant
  errors: FieldErrors<Omit<shiftInterface, "id">>
  control: Control<Omit<shiftInterface, "id">>
  setUserData: (data: userInterface | null) => void
}

const ShiftFormInputs: React.FC<Props> = ({
  errors,
  control,
  shiftVariant,
  setValue,
  setUserData,
}) => {
  const t = useTranslations("Form")

  const { data: usersList } = useSuspenseQuery<userInterface[]>(getUsersOptions())

  const [template, setTemplate] = useState<ShiftTimingOptions | null>(null)

  const shiftOptionsByShiftVariant =
    shiftVariant === ShiftVariant.ABSENCE ? absenceTypeOptions : shiftTypeOptions

  return (
    <>
      <InputLabelWrapper label={t("labels.section")} error={errors?.shiftType?.message}>
        <Controller
          name="shiftType"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              isClearable
              placeholder={t("placeholders.section")}
              styles={selectStyles}
              options={shiftOptionsByShiftVariant}
              onChange={selectedOption => {
                onChange(selectedOption?.value)
              }}
              value={shiftOptionsByShiftVariant.find(option => option.value === value)}
            />
          )}
        />
      </InputLabelWrapper>

      <InputLabelWrapper label={t("labels.user")} error={errors?.userId?.message} required>
        <Controller
          name="userId"
          control={control}
          rules={{
            required: t("validation.userRequired"),
          }}
          render={({ field: { onChange, value } }) => (
            <Select
              isClearable
              placeholder={t("placeholders.user")}
              styles={selectStyles}
              options={mockUserOptions}
              onChange={selectedOption => {
                onChange(selectedOption?.value || null)
                const user = usersList.find(item => item.id === selectedOption?.value)
                setUserData(user || null)
              }}
              value={mockUserOptions.find(option => option.value === value)}
              isSearchable={true}
            />
          )}
        />
      </InputLabelWrapper>

      <InputLabelWrapper label={t("labels.competencies")} error={errors?.competencies?.message}>
        <Controller
          name="competencies"
          control={control}
          render={({ field }) => (
            <Select
              placeholder={t("placeholders.competencies")}
              styles={selectStyles}
              isMulti
              options={competenciesOptions}
              onChange={selectedOptions =>
                field.onChange(selectedOptions ? selectedOptions.map(option => option.value) : [])
              }
              value={competenciesOptions.filter(option => field.value?.includes(option.value))}
            />
          )}
        />
      </InputLabelWrapper>

      <InputLabelWrapper label={t("labels.attributes")} error={errors?.attributes?.message}>
        <Controller
          name="attributes"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              placeholder={t("placeholders.attributes")}
              styles={selectStyles}
              isMulti
              options={attributesOptions}
              onChange={selectedOptions =>
                onChange(selectedOptions ? selectedOptions.map(option => option.value) : [])
              }
              value={attributesOptions.filter(option => value?.includes(option.value))}
            />
          )}
        />
      </InputLabelWrapper>

      <div className="flex gap-2">
        <InputLabelWrapper
          label={t("labels.start")}
          error={errors?.start?.message}
          className="max-w-[90px]"
          required
        >
          <Controller
            name="start"
            control={control}
            rules={{ required: "Start field is required" }}
            render={({ field: { onChange, value } }) => (
              <TimeField
                value={value || "00:00"}
                style={timePickerStyles}
                onChange={value => {
                  setTemplate(null)
                  onChange(value)
                }}
              />
            )}
          />
        </InputLabelWrapper>
        <InputLabelWrapper
          label={t("labels.end")}
          error={errors?.end?.message}
          className="max-w-[90px]"
          required
        >
          <Controller
            name="end"
            control={control}
            rules={{ required: "End field is required" }}
            render={({ field: { onChange, value } }) => (
              <TimeField
                value={value || "00:00"}
                style={timePickerStyles}
                onChange={value => {
                  setTemplate(null)
                  onChange(value)
                }}
              />
            )}
          />
        </InputLabelWrapper>

        <InputLabelWrapper label={t("labels.templates")} className="w-full">
          <Select
            placeholder={t("placeholders.shortcuts")}
            styles={selectStyles}
            options={shiftTimingOptions}
            onChange={selectedOption => {
              if (!selectedOption) return
              setTemplate(selectedOption.value)
              setValue("start", selectedOption.start)
              setValue("end", selectedOption.end)
            }}
            value={shiftTimingOptions.find(item => item.value === template) || null}
          />
        </InputLabelWrapper>
      </div>

      <div className="flex gap-2">
        <InputLabelWrapper label={t("labels.breakPaid")}>
          <Controller
            name="breakPaid"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TimeField
                value={value ? getMinutesToHHmm(+value) : "00:00"}
                style={timePickerStyles}
                onChange={e => {
                  onChange(getHHmmToMinutes(e.target.value))
                }}
              />
            )}
          />
        </InputLabelWrapper>
        <InputLabelWrapper label={t("labels.breakUnpaid")}>
          <Controller
            name="breakUnpaid"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TimeField
                value={value ? getMinutesToHHmm(+value) : "00:00"}
                style={timePickerStyles}
                onChange={e => {
                  onChange(getHHmmToMinutes(e.target.value))
                }}
              />
            )}
          />
        </InputLabelWrapper>
      </div>

      <InputLabelWrapper label={t("labels.specialCode")} error={errors?.specialCode?.message}>
        <Controller
          name="specialCode"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              placeholder={t("placeholders.specialCode")}
              isClearable
              styles={selectStyles}
              options={specialCodeOptions}
              onChange={selectedOption => onChange(selectedOption?.value || null)}
              value={specialCodeOptions.find(option => option.value === value) || null}
            />
          )}
        />
      </InputLabelWrapper>

      <label className="text-m flex flex-col gap-1 font-semibold text-gray-700">
        <Controller
          name="isShiftCompensated"
          control={control}
          render={({ field }) => (
            <Checkbox
              isChecked={!!field.value}
              setIsChecked={value => {
                field.onChange(value)
              }}
              label="Is shift compensated"
            />
          )}
        />
      </label>
    </>
  )
}

export default React.memo(ShiftFormInputs)
