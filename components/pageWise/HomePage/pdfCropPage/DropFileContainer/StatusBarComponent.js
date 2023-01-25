import React from 'react'
import { ProgressBar } from '@uppy/react'

export default function MyComponent (props) {
  const { uppy } = props
  return (
    <ProgressBar
      // assuming `props.uppy` contains an Uppy instance:
      uppy={uppy}
      fixed
      hideAfterFinish
    />
  )
}