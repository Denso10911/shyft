import React from "react"

type Props = {
  value: unknown
  children: React.ReactNode
}

const ConditionalRender: React.FC<Props> = ({ value, children }) => {
  return <>{!!value && children}</>
}

export default ConditionalRender
