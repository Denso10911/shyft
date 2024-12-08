"use client"
import React from "react"
import { IoMdClose } from "react-icons/io"
import Modal from "react-modal"
import { useTranslations } from "next-intl"

import ShiftForm from "../ShiftForm"

import { useShiftStore } from "@/store/shiftStore"
import { ShiftModalTypes } from "@/types/enums"
import { customModalStyles } from "@/utiles/styles"

Modal.setAppElement("body")

type Props = {
  isOpen: boolean
  closeHandler: () => void
}

const AsideModal: React.FC<Props> = ({ isOpen, closeHandler }) => {
  const t = useTranslations("ShiftModal")

  const shiftModalType = useShiftStore(state => state.shiftModalType)

  const modalTitles = {
    [ShiftModalTypes.CREATE]: t("titles.create"),
    [ShiftModalTypes.EDIT]: t("titles.edit"),
    [ShiftModalTypes.COPY]: t("titles.create"),
  }

  return (
    <Modal isOpen={isOpen} style={customModalStyles} onRequestClose={closeHandler} className="">
      <div className="h-full font-[family-name:var(--font-geist-sans)]">
        <div className="flex items-center gap-3 border-b px-6 py-4">
          <button
            onClick={() => {
              closeHandler()
            }}
            className=" h-4 w-4"
          >
            <IoMdClose className="h-full w-full" />
          </button>
          <h2 className="text-xl font-bold">{modalTitles[shiftModalType]}</h2>
        </div>
        <ShiftForm closeHandler={closeHandler} />
      </div>
    </Modal>
  )
}

export default AsideModal
