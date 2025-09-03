import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ArrowLeft, Download, Info } from 'lucide-react'
import toast from 'react-hot-toast'

import Card from '../components/Card'
import { api } from '../lib/api'
import { formatDate, convertFieldSize } from '../lib/utils'

export default function Detail() {
  const location = useLocation()
  const { inputs, prediction } = location.state || {}

  if (!inputs || !prediction) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">No Data Available</h2>
          <p className="text-gray-600 mb-6">
            Please go back to the prediction page and submit your farm information.
          </p>
          <Link to="/predict" className="btn-primary">
            Go to Prediction
          </Link>
        </Card>
      </div>
    )
  }

  const handleDownloadReport = async () => {
    try {
      await api.downloadReport()
      toast.success('Report downloaded successfully!')
    } catch (error) {
      toast.error('Failed to download report')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Low': return 'status-low'
      case 'Optimal': return 'status-optimal'
      case 'High': return 'status-high'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const inputRows = [
    { label: 'Temperature', value: `${inputs.Temperature}°C` },
    { label: 'Humidity', value: `${inputs.Humidity}%` },
    { label: 'Moisture', value: `${inputs.Moisture}%` },
    { label: 'pH Level', value: inputs.pH },
    { label: 'Soil Type', value: inputs.Soil_Type },
    { label: 'Crop Type', value: inputs.Crop },
    { label: 'Nitrogen', value: `${inputs.Nitrogen} kg/ha` },
    { label: 'Phosphorus', value: `${inputs.Phosphorus} kg/ha` },
    { label: 'Potassium', value: `${inputs.Potassium} kg/ha` },
    { label: 'Sowing Date', value: formatDate(inputs.Sowing_Date) },
    { label: 'Field Size', value: `${inputs.Field_Size} ${inputs.unit}` },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link
            to="/predict"
            className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Prediction
          </Link>
        </div>
        <button
          onClick={handleDownloadReport}
          className="btn-secondary flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Summary */}
        <Card title="Farm Information" description="Your submitted data">
          <div className="space-y-3">
            {inputRows.map((row, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-sm font-medium text-gray-600">{row.label}</span>
                <span className="text-sm text-gray-900">{row.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommendations */}
        <div className="space-y-6">
          {/* Nutrient Status */}
          <Card title="Nutrient Analysis" description="Current soil nutrient levels">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">N</div>
                <span className={`status-chip ${getStatusColor(prediction.N_Status)}`}>
                  {prediction.N_Status}
                </span>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">P</div>
                <span className={`status-chip ${getStatusColor(prediction.P_Status)}`}>
                  {prediction.P_Status}
                </span>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">K</div>
                <span className={`status-chip ${getStatusColor(prediction.K_Status)}`}>
                  {prediction.K_Status}
                </span>
              </div>
            </div>
          </Card>

          {/* Primary Recommendation */}
          <Card title="Primary Recommendation" className="border-primary-200 bg-primary-50">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-900 mb-2">
                {prediction.Primary_Fertilizer}
              </div>
              <div className="inline-flex items-center text-sm text-primary-700 bg-primary-100 px-3 py-1 rounded-full">
                <Info className="w-4 h-4 mr-1" />
                Best match for your soil and crop conditions
              </div>
            </div>
          </Card>

          {/* Additional Recommendations */}
          <Card title="Additional Options">
            <div className="space-y-4">
              {prediction.Secondary_Fertilizer && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">Secondary Fertilizer</h5>
                  <p className="text-gray-600">{prediction.Secondary_Fertilizer}</p>
                </div>
              )}

              {(prediction.Organic_1 || prediction.Organic_2 || prediction.Organic_3) && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Organic Alternatives</h5>
                  <ul className="space-y-1">
                    {prediction.Organic_1 && (
                      <li className="text-sm text-gray-600">• {prediction.Organic_1}</li>
                    )}
                    {prediction.Organic_2 && (
                      <li className="text-sm text-gray-600">• {prediction.Organic_2}</li>
                    )}
                    {prediction.Organic_3 && (
                      <li className="text-sm text-gray-600">• {prediction.Organic_3}</li>
                    )}
                  </ul>
                </div>
              )}

              {prediction.pH_Amendment && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">pH Amendment</h5>
                  <p className="text-gray-600">{prediction.pH_Amendment}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Model Info */}
          {prediction.meta && (
            <Card title="Model Information">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Algorithm:</span>
                  <span className="text-sm font-medium text-gray-900">{prediction.meta.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Version:</span>
                  <span className="text-sm font-medium text-gray-900">{prediction.meta.version}</span>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Field Size Conversion */}
      <Card className="mt-8" title="Field Size Conversion">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Your field size:</span>
            <span className="font-medium">{inputs.Field_Size} {inputs.unit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              {inputs.unit === 'hectare' ? 'In acres:' : 'In hectares:'}
            </span>
            <span className="font-medium">
              {convertFieldSize(
                inputs.Field_Size, 
                inputs.unit, 
                inputs.unit === 'hectare' ? 'acre' : 'hectare'
              ).toFixed(2)} {inputs.unit === 'hectare' ? 'acres' : 'hectares'}
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}