import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"
import TimeField from "react-simple-timefield"
import { toast } from "react-toastify"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { v1 as uuidv1 } from "uuid"

import Button from "@/components/Button"
import InputLabelWrapper from "@/components/InputLabelWrapper"

import Checkbox from "../Checkbox"

import { shiftsApi } from "@/api/shifts"
import { editShiftPayloadType } from "@/api/types"
import { getUsersOptions } from "@/api/users"
import { useShiftStore } from "@/store/shiftStore"
import { shiftInterface, userInterface } from "@/types"
import { ShiftModalTypes, ShiftTimingOptions, ShiftType, ShiftVariant } from "@/types/enums"
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
  closeHandler: () => void
}

const ShiftForm: React.FC<Props> = ({ closeHandler }) => {
  const t = useTranslations("Form")
  const queryClient = useQueryClient()

  const { selectedShift, selectedDate, shiftModalType } = useShiftStore(state => state)

  const [template, setTemplate] = useState<ShiftTimingOptions | null>(null)
  const [exceedingHours, setExceedingHours] = useState(0)
  const [userData, setUserData] = useState<userInterface | null>(null)

  const { data: usersList } = useSuspenseQuery<userInterface[]>(getUsersOptions())

  const createShiftMutation = useMutation({
    mutationFn: (payload: shiftInterface) => shiftsApi.createShift(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["shifts"] })
      toast.success("Shift added successfully")
      closeHandler()
    },
    onError: () => {
      toast.error(t("mutationError"))
    },
  })

  const editShiftMutation = useMutation({
    mutationFn: (payload: editShiftPayloadType) => shiftsApi.editShift(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["shifts"] })
      toast.success("Shift added successfully")
      closeHandler()
    },
    onError: () => {
      toast.error(t("mutationError"))
    },
  })

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Omit<shiftInterface, "id">>({
    defaultValues: {
      shiftType: selectedShift?.shiftType || null,
      userId: selectedShift?.userId || "",
      competencies: selectedShift?.competencies || [],
      attributes: selectedShift?.attributes || [],
      start: selectedShift?.start || "00:00",
      end: selectedShift?.end || "00:00",
      breakPaid: selectedShift?.breakPaid || null,
      breakUnpaid: selectedShift?.breakUnpaid || null,
      specialCode: selectedShift?.specialCode || null,
      isShiftCompensated: !!selectedShift?.isShiftCompensated,
      shiftVariant: selectedShift?.shiftVariant || 0,
      shiftLength: selectedShift?.shiftLength || null,
    },
  })

  const [start, end, shiftVariant] = watch(["start", "end", "shiftVariant"])

  const shiftOptionsByShiftVariant =
    shiftVariant === ShiftVariant.ABSENCE ? absenceTypeOptions : shiftTypeOptions

  useEffect(() => {
    if (userData && start && end) {
      const startDate = getHHmmToMinutes(start)
      const endDate = getHHmmToMinutes(end)

      const totalHours = (startDate - endDate) / 60

      setValue("shiftLength", totalHours)

      if (userData.hoursWorked + totalHours > 38) {
        setExceedingHours(userData.hoursWorked + totalHours - 38)
      } else {
        setExceedingHours(0)
      }
    }
  }, [start, end])

  const onSubmit = (dataToSubmit: Omit<shiftInterface, "id" | "date">) => {
    const shiftDate = selectedShift ? selectedShift.date : selectedDate

    const payload: shiftInterface = {
      ...dataToSubmit,
      id: shiftModalType === ShiftModalTypes.CREATE ? uuidv1() : selectedShift!.id,
      date: shiftDate || dayjs().format("YYYY-MM-DD"),
      shiftLength: getHHmmToMinutes(dataToSubmit.end) - getHHmmToMinutes(dataToSubmit.start),
    }

    if (shiftModalType === ShiftModalTypes.CREATE) {
      createShiftMutation.mutate(payload)
    }

    if (shiftModalType === ShiftModalTypes.EDIT) {
      editShiftMutation.mutate({ id: selectedShift!.id, shift: payload })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-[calc(100vh-63px)] flex-1 flex-col gap-4 p-6"
    >
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

      <InputLabelWrapper label={t("labels.section")} error={errors?.shiftType?.message}>
        <Controller
          name="shiftType"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              isClearable
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

      <InputLabelWrapper label={t("labels.user")} error={errors?.userId?.message}>
        <Controller
          name="userId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              isClearable
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
    </form>
  )
}

export default ShiftForm
