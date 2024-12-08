import React, { useEffect } from "react"
import { toast } from "react-toastify"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

import ContextMenuContainer from "@/components/ContextMenuContainer"
import ShiftContextMenu from "@/components/ShiftContextMenu"

import { shiftsApi } from "@/api/shifts"
import { useShiftStore } from "@/store/shiftStore"
import { shiftInterface } from "@/types"
import { ShiftModalTypes } from "@/types/enums"
import { contextMenuType } from "@/types/types"

type Props = {
  contextMenu: contextMenuType
  handleCloseContextMenu: () => void
  setIsModalOpen: (value: boolean) => void
  data: shiftInterface
}

const ShiftContextMenuContainer: React.FC<Props> = ({
  contextMenu,
  handleCloseContextMenu,
  setIsModalOpen,
  data,
}) => {
  const t = useTranslations("ShiftContextMenu")
  const queryClient = useQueryClient()

  const { setSelectedShift, setShiftModalType } = useShiftStore(state => state)

  const deleteShiftMutation = useMutation({
    mutationFn: (payload: string) => shiftsApi.deleteShiftById(payload),

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["shifts"] })
      toast.success(t("deleteSuccess"))
    },
    onError: () => {
      toast.error(t("deleteError"))
    },
  })

  const handleContextMenuDeleteClick = () => {
    deleteShiftMutation.mutate(contextMenu.id)
    handleCloseContextMenu()
  }
  const handleContextMenuEditClick = () => {
    setIsModalOpen(true)
    setSelectedShift(data)
    setShiftModalType(ShiftModalTypes.EDIT)
    handleCloseContextMenu()
  }
  const handleContextMenuCopyClick = () => {
    setIsModalOpen(true)
    setSelectedShift(data)
    setShiftModalType(ShiftModalTypes.CREATE)
    handleCloseContextMenu()
  }

  useEffect(() => {
    if (contextMenu.visible && process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      toast.error(
        "If you want to Edit or Delete shift, please start the project with json server in dev mode",
        {
          position: "top-center",
        }
      )
    }
  }, [contextMenu.visible])

  return (
    <>
      {contextMenu.visible && (
        <ContextMenuContainer
          top={contextMenu.y}
          left={contextMenu.x}
          handleClose={handleCloseContextMenu}
        >
          <ShiftContextMenu
            onDelete={handleContextMenuDeleteClick}
            onEdit={handleContextMenuEditClick}
            onCopy={handleContextMenuCopyClick}
          />
        </ContextMenuContainer>
      )}
    </>
  )
}

export default ShiftContextMenuContainer
