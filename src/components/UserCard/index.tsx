import React from "react"
import { userInterface } from "@/types"
import Avatar from "@/components/Avatar"
import { userRoleName } from "@/utiles/UserData"
import { useTranslations } from "next-intl"

type Props = {
  data: userInterface
}

const UserCard: React.FC<Props> = ({ data }) => {
  const t = useTranslations("UserCard")
  return (
    <div className="flex gap-4">
      <Avatar
        avatar={data.profileImage}
        letters={`${data.firstName[0]}${data.lastName[0]}`}
        size="md"
      />
      <div className="flex flex-col">
        <div className="font-bold">
          {data.firstName} {data.lastName}
        </div>
        <div className="text-sm text-color-gray">{t(`roles.${userRoleName[data.role]}`)}</div>
        {data.hoursWorked && (
          <div className="p-1 text-sm font-bold text-color-yellow">{data.hoursWorked}h</div>
        )}
      </div>
    </div>
  )
}

export default UserCard
