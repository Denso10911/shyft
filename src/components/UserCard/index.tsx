import React from "react"
import { StaticImageData } from "next/image"
import { useTranslations } from "next-intl"

import Avatar from "@/components/Avatar"

import { UserRoles } from "@/types/enums"
import { userRoleName } from "@/utiles/UserData"

type Props = {
  profileImage: string | StaticImageData | null
  firstName: string
  lastName: string
  role: UserRoles
  hoursWorked: number
}

const UserCard: React.FC<Props> = ({ profileImage, firstName, lastName, role, hoursWorked }) => {
  const t = useTranslations("UserCard")
  return (
    <div className="flex gap-4">
      <Avatar avatar={profileImage} letters={`${firstName[0]}${lastName[0]}`} size="md" />
      <div className="flex flex-col">
        <div className="font-bold">
          {firstName} {lastName}
        </div>
        <div className="text-sm text-color-gray">{t(`roles.${userRoleName[role]}`)}</div>
        {hoursWorked && (
          <div className="p-1 text-sm font-bold text-color-yellow">{hoursWorked}h</div>
        )}
      </div>
    </div>
  )
}

export default React.memo(UserCard)
