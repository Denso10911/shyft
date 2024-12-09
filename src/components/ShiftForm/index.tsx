import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { v1 as uuidv1 } from "uuid"

import ShiftFormFooter from "@/components/ShiftFormFooter"
import ShiftFormInputs from "@/components/ShiftFormInputs"
import ShiftFormTabs from "@/components/ShiftFormTabs"

import { shiftsApi } from "@/api/shifts"
import { editShiftPayloadType } from "@/api/types"
import { useShiftStore } from "@/store/shiftStore"
import { shiftInterface, userInterface } from "@/types"
import { ShiftModalTypes } from "@/types/enums"
import { getHHmmToMinutes } from "@/utiles/getHHmmToMinutes"

type Props = {
  closeHandler: () => void
}

const ShiftForm: React.FC<Props> = ({ closeHandler }) => {
  const t = useTranslations("Form")
  const queryClient = useQueryClient()

  const { selectedShift, selectedDate, shiftModalType, selectedUser } = useShiftStore(
    state => state
  )

  const [exceedingHours, setExceedingHours] = useState(0)
  const [userData, setUserData] = useState<userInterface | null>(null)

  const createShiftMutation = useMutation({
    mutationFn: (payload: shiftInterface) => shiftsApi.createShift(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["shifts"] })
      toast.success(t("result.successCreated"))
      closeHandler()
    },
    onError: () => {
      toast.error(t("result.error"))
    },
  })

  const editShiftMutation = useMutation({
    mutationFn: (payload: editShiftPayloadType) => shiftsApi.editShift(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["shifts"] })
      toast.success(t("result.successEdited"))
      closeHandler()
    },
    onError: () => {
      toast.error(t("result.error"))
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
      userId: selectedShift?.userId || selectedUser || "",
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

    const shiftStartMinutes = getHHmmToMinutes(dataToSubmit.start)
    const shiftEndMinutes = getHHmmToMinutes(dataToSubmit.end)

    const shiftLength =
      shiftEndMinutes < shiftStartMinutes
        ? shiftEndMinutes + 1440 - shiftStartMinutes
        : shiftEndMinutes - shiftStartMinutes

    const payload: shiftInterface = {
      ...dataToSubmit,
      id: shiftModalType === ShiftModalTypes.CREATE ? uuidv1() : selectedShift!.id,
      date: shiftDate || dayjs().format("YYYY-MM-DD"),
      shiftLength,
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
      <ShiftFormTabs shiftVariant={shiftVariant} setValue={setValue} />

      <ShiftFormInputs
        shiftVariant={shiftVariant}
        errors={errors}
        setValue={setValue}
        control={control}
        setUserData={setUserData}
      />

      <ShiftFormFooter exceedingHours={exceedingHours} closeHandler={closeHandler} />
    </form>
  )
}

export default ShiftForm
