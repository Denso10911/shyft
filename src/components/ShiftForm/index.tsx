import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"
import TimeField from "react-simple-timefield"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"

import Button from "@/components/Button"
import InputLabelWrapper from "@/components/InputLabelWrapper"

import Checkbox from "../Checkbox"

import { shiftInterface, userInterface } from "@/types"
import { ShiftTimingOptions, ShiftVariant } from "@/types/enums"
import { mockUserOptions, mockUsersData } from "@/utiles/dummyContents"
import {
  attributesOptions,
  competenciesOptions,
  shiftTimingOptions,
  shiftTypeOptions,
  specialCodeOptions,
} from "@/utiles/dummyContents"
import { getHHmmToMinutes } from "@/utiles/getHHmmToMinutes"
import { getMinutesToHHmm } from "@/utiles/getMinutesToHHmm"
import { selectStyles, timePickerStyles } from "@/utiles/styles"

type Props = {
  data?: shiftInterface
  closeHandler: () => void
}

const ShiftForm: React.FC<Props> = ({ data, closeHandler }) => {
  const t = useTranslations("Form")

  const [template, setTemplate] = useState<ShiftTimingOptions | null>(null)

  const [exceedingHours, setExceedingHours] = useState(0)

  const [userData, setUserData] = useState<userInterface | null>(
    data ? mockUsersData.find(user => user.id === data?.userId) || null : null
  )

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Omit<shiftInterface, "id">>({
    defaultValues: {
      shiftType: data?.shiftType,
      userId: data?.userId,
      competencies: data?.competencies || [],
      attributes: data?.attributes || [],
      start: data?.start,
      end: data?.end,
      breakPaid: data?.breakPaid || null,
      breakUnpaid: data?.breakUnpaid || null,
      specialCode: data?.specialCode,
      isShiftCompensated: data?.isShiftCompensated,
      status: data?.status,
      shiftLength: data?.shiftLength,
    },
  })

  const formValues = watch(["userId", "start", "end"])

  useEffect(() => {
    const [, start, end] = formValues

    if (userData && start && end) {
      const startDate = dayjs(`2024-12-06T${start}:00`)
      let endDate = dayjs(`2024-12-06T${end}:00`)

      if (endDate.isBefore(startDate)) {
        endDate = endDate.add(1, "day")
      }

      const diffInMinutes = endDate.diff(startDate, "minute")
      const totalHours = diffInMinutes / 60

      setValue("shiftLength", totalHours)

      if (userData.hoursWorked + totalHours > 38) {
        setExceedingHours(userData.hoursWorked + totalHours - 38)
      } else {
        setExceedingHours(0)
      }
    }
  }, [formValues])

  const onSubmit = (dataToSubmit: Omit<shiftInterface, "id">) => {
    console.log(dataToSubmit)
    closeHandler()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-[calc(100vh-61px)] flex-1 flex-col gap-4 p-6"
    >
      <div className="flex gap-0 overflow-hidden rounded">
        <Button
          type="button"
          onClick={() => {
            setValue("status", ShiftVariant.SHIFT)
          }}
          size="sm"
          variant="gray"
          width="full"
        >
          {t("buttons.shift")}
        </Button>
        <Button
          type="button"
          onClick={() => {
            setValue("status", ShiftVariant.ABSENCE)
          }}
          size="sm"
          variant="light"
          width="full"
        >
          {t("buttons.absence")}
        </Button>
      </div>

      <InputLabelWrapper label={t("labels.section")} error={errors?.shiftType?.message}>
        <Controller
          name="shiftType"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              styles={selectStyles}
              options={shiftTypeOptions}
              onChange={selectedOption => {
                onChange(selectedOption?.value)
              }}
              value={shiftTypeOptions.find(option => option.value === value)}
            />
          )}
        />
      </InputLabelWrapper>

      <InputLabelWrapper label={t("labels.user")} error={errors?.userId?.message}>
        <Controller
          name="userId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              styles={selectStyles}
              options={mockUserOptions}
              onChange={selectedOption => {
                onChange(selectedOption?.value || null)

                const user = mockUsersData.find(item => item.id === selectedOption?.value)
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

      <div className="mt-auto flex flex-col gap-2">
        {exceedingHours > 0 && (
          <ul className="mb-5 pl-10">
            <li className="list-disc text-sm">
              Exceeding the maximum weekly hours of 38h (+${exceedingHours.toFixed(0)} h)
            </li>
          </ul>
        )}

        <div className=" flex justify-between gap-2">
          <Button type="button" variant="red" size="md" width="full" onClick={closeHandler} rounded>
            {t("buttons.cancel")}
          </Button>
          <Button type="submit" variant="green" size="md" width="full" rounded>
            {t("buttons.addShift")}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ShiftForm
