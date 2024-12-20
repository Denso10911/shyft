import React from "react"

import AbsenceCard from "@/components/AbsenceCard"
import Badge from "@/components/Badge"
import ShiftCard from "@/components/ShiftCard"
import UserCard from "@/components/UserCard"

import { ColorsEnum, ShiftVariant } from "@/types/enums"
import { COLORS } from "@/utiles/colors"
import { mockShiftData, mockUsersData } from "@/utiles/dummyContents"

type ColorKey = keyof typeof COLORS

const Components = () => {
  return (
    <div className="container flex flex-col gap-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Badges</h2>
        <div className="flex flex-col gap-2 rounded-[20px] border p-4">
          <div className="grid grid-cols-1 gap-1">
            <Badge label="full width" background={ColorsEnum.BLUE} width="full" />
            <Badge label="full width" background={ColorsEnum.WHITE} width="full" />
            <div className="flex flex-wrap gap-1">
              {Object.keys(COLORS).map((color, index) => {
                return (
                  <Badge
                    key={index}
                    label="max content"
                    background={color as ColorKey}
                    width="max"
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Shift Card</h2>
        <div className="flex flex-col gap-2 rounded-[20px] border p-4">
          <div className="flex gap-1">
            {mockShiftData.map((data, index) => {
              if (data.shiftVariant === ShiftVariant.SHIFT) {
                return (
                  <ShiftCard
                    key={index}
                    data={data}
                    currency={840}
                    salary={"123"}
                    setIsModalOpen={() => {}}
                  />
                )
              }
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Absence Card</h2>
        <div className="flex flex-col gap-2 rounded-[20px] border p-4">
          <div className="flex gap-1">
            {mockShiftData.map((data, index) => {
              if (data.shiftVariant !== ShiftVariant.SHIFT) {
                return (
                  <AbsenceCard
                    key={index}
                    data={data}
                    currency={840}
                    salary={"123"}
                    setIsModalOpen={() => {}}
                  />
                )
              }
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">User Card</h2>
        <div className="flex flex-col gap-2 rounded-[20px] border p-4">
          <div className="grid grid-cols-4 gap-1">
            {mockUsersData.map((data, index) => {
              return (
                <UserCard
                  key={index}
                  role={data.role}
                  hoursWorked={data.hoursWorked}
                  profileImage={data.profileImage}
                  lastName={data.lastName}
                  firstName={data.firstName}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Components
