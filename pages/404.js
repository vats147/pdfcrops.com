import React from 'react'
import BaseOneLayout from '@/layouts/BaseOneLayout/BaseOneLayout'

export default function Custom404() {
  return (
    <BaseOneLayout>
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-700 mb-6">Page not found</p>
          <a href="/" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md">Go back home</a>
        </div>
      </div>
    </BaseOneLayout>
  )
}
