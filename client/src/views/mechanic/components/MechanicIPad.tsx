import React from 'react'
import '../styles/MechanicIPad.scss'

export const MechanicIPad: (props: { children: any }) => JSX.Element = (
  props
) => {
  return (
    <div className={'mechanic-i-pad'}>
      <div>{props.children}</div>
    </div>
  )
}
