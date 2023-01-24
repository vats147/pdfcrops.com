import React from 'react'
import { StatusBar } from '@uppy/react'

export default function StatusBarComponent ( {uppy} ) {

  return (
    <StatusBar
      uppy={uppy}
      hideUploadButton
      hideAfterFinish={false}
      showProgressDetails
    />
  )
}