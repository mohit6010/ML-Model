import React from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingProps {
  text?: string
  overlay?: boolean
}

export default function Loading({ text = 'Loading...', overlay = false }: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  )

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      {content}
    </div>
  )
}