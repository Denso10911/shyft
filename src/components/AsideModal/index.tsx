"use client"
import { shiftInterface } from "@/types"
import React from "react"
import Modal from "react-modal"
import ShiftForm from "../ShiftForm"

import { IoMdClose } from "react-icons/io"
import { customModalStyles } from "@/utiles/styles"

Modal.setAppElement("body")

type Props = {
  isOpen: boolean
  closeHandler: () => void
  type: "newShift" | "editShift"
  data?: shiftInterface
}

const renderTitle = (type: "newShift" | "editShift") => {
  switch (type) {
    case "newShift":
      return <h2 className="text-xl font-bold">Create new shift</h2>
    case "editShift":
      return <h2 className="text-xl font-bold">Edit shift</h2>
    default:
      return null
  }
}

const AsideModal: React.FC<Props> = ({ isOpen, closeHandler, type, data }) => {
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
          {renderTitle(type)}
        </div>
        <ShiftForm data={data} closeHandler={closeHandler} />
      </div>
    </Modal>
  )
}

export default AsideModal
