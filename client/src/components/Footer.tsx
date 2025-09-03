import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Fertilizer Recommendation System - Model running in Flask (main.py)
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Created by Krushnakant Bankar & Tejas Golhar
          </p>
        </div>
      </div>
    </footer>
  )
}