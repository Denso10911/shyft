import { shiftInterface } from "@/types"

export type updateShiftPayloadType = {
  id: string
  shift: {
    date: string
    userId: string
  }
}

export type editShiftPayloadType = {
  id: string
  shift: shiftInterface
}
