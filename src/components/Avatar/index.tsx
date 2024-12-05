import React from "react"
import cn from "classnames"
import Image, { StaticImageData } from "next/image"

type SizeType = "md" | "l" | "lg" | "sm"

interface Props {
  avatar: string | StaticImageData | null
  letters?: string | null
  size: SizeType
}

const Avatar: React.FC<Props> = ({ avatar, letters, size }) => (
  <div
    data-component="Avatar"
    className={cn(
      "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-color-light-gray",
      size === "sm" ? "h-5 w-5" : "",
      size === "md" ? "h-10 w-10" : "",
      size === "lg" ? "h-[72px] w-[72px]" : ""
    )}
  >
    {avatar ? (
      <Image src={avatar} alt="person-avatar" fill />
    ) : (
      <div
        className={`flex items-center justify-center text-color-black ${
          size === "lg" && "text-[30px]"
        }`}
      >
        {letters}
      </div>
    )}
  </div>
)
export default Avatar
