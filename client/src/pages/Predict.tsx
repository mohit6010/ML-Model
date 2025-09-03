import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Download, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

import { predictionSchema, PredictionFormData } from '../lib/validation'
import { usePrediction } from '../hooks/usePrediction'
import { api } from '../lib/api'
import NumberField from '../components/NumberField'
import Select from '../components/Select'
import Input from '../components/Input'
import Card from '../components/Card'
import Loading from '../components/Loading'

const soilTypes = [
  { value: 'Sandy', label: 'Sandy' },
  { value: 'Loamy', label: 'Loamy' },
  { value: 'Silty', label: 'Silty' },
  { value: 'Clayey', label: 'Clayey' },
  { value: 'Peaty', label: 'Peaty' },
  { value: 'Chalky', label: 'Chalky' },
]

const crops = [
  { value: 'Barley', label: 'Barley' },
  { value: 'Cotton', label: 'Cotton' },
  { value: 'Ground Nuts', label: 'Ground Nuts' },
  { value: 'Maize', label: 'Maize' },
  { value: 'Millets', label: 'Millets' },
  { value: 'Oil Seeds', label: 'Oil Seeds' },
  { value: 'Paddy', label: 'Paddy' },
  { value: 'Pulses', label: 'Pulses' },
  { value: 'Sugarcane', label: 'Sugarcane' },
  { value: 'Tobacco', label: 'Tobacco' },
  { value: 'Wheat', label: 'Wheat' },
  { value: 'Coffee', label: 'Coffee' },
  { value: 'Kidney Beans', label: 'Kidney Beans' },
  { value: 'Orange', label: 'Orange' },
  { value: 'Pomegranate', label: 'Pomegranate' },
  { value: 'Rice', label: 'Rice' },
  { value: 'Watermelon', label: 'Watermelon' },
]

const units = [
  { value: 'hectare', label: 'Hectare' },
  { value: 'acre', label: 'Acre' },
]

export default function Predict() {
  const navigate = useNavigate()
  const { data, loading, error, predict } = usePrediction()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PredictionFormData>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      Temperature: 25,
      Humidity: 60,
      Moisture: 40,
      pH: 6.5,
      Field_Size: 1,
      unit: 'hectare',
    },
  })

  const onSubmit = async (formData: PredictionFormData) => {
    try {
      const result = await predict(formData)
      toast.success('Prediction completed successfully!')
    } catch (error) {
      toast.error('Failed to get prediction. Please try again.')
    }
  }

  const handleViewDetails = () => {
    const formData = watch()
    navigate('/detail', { 
      state: { 
        inputs: formData, 
        prediction: data 
      } 
    })
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Get Your Fertilizer Recommendation
        </h1>
        <p className="text-lg text-gray-600">
          Enter your soil and crop information to receive personalized fertilizer recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card title="Farm Information" description="Provide details about your soil and crop conditions">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NumberField
                label="Temperature"
                suffix="°C"
                required
                {...register('Temperature', { valueAsNumber: true })}
                error={errors.Temperature?.message}
                hint="Average temperature in Celsius"
              />
              <NumberField
                label="Humidity"
                suffix="%"
                required
                {...register('Humidity', { valueAsNumber: true })}
                error={errors.Humidity?.message}
                hint="Relative humidity percentage"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NumberField
                label="Moisture"
                suffix="%"
                required
                {...register('Moisture', { valueAsNumber: true })}
                error={errors.Moisture?.message}
                hint="Soil moisture content"
              />
              <NumberField
                label="pH Level"
                required
                step="0.1"
                {...register('pH', { valueAsNumber: true })}
                error={errors.pH?.message}
                hint="Soil pH level (3-10)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Soil Type"
                required
                options={soilTypes}
                {...register('Soil_Type')}
                error={errors.Soil_Type?.message}
              />
              <Select
                label="Crop Type"
                required
                options={crops}
                {...register('Crop')}
                error={errors.Crop?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <NumberField
                label="Nitrogen"
                suffix="kg/ha"
                required
                {...register('Nitrogen', { valueAsNumber: true })}
                error={errors.Nitrogen?.message}
              />
              <NumberField
                label="Phosphorus"
                suffix="kg/ha"
                required
                {...register('Phosphorus', { valueAsNumber: true })}
                error={errors.Phosphorus?.message}
              />
              <NumberField
                label="Potassium"
                suffix="kg/ha"
                required
                {...register('Potassium', { valueAsNumber: true })}
                error={errors.Potassium?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Sowing Date"
                type="date"
                required
                {...register('Sowing_Date')}
                error={errors.Sowing_Date?.message}
              />
              <div className="flex gap-2">
                <div className="flex-1">
                  <NumberField
                    label="Field Size"
                    required
                    step="0.1"
                    {...register('Field_Size', { valueAsNumber: true })}
                    error={errors.Field_Size?.message}
                  />
                </div>
                <div className="w-32">
                  <Select
                    label="Unit"
                    required
                    options={units}
                    {...register('unit')}
                    error={errors.unit?.message}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Recommendation
                </>
              )}
            </button>
          </form>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {loading && (
            <Card>
              <Loading text="Analyzing your farm data..." />
            </Card>
          )}

          {error && (
            <Card className="border-red-200 bg-red-50">
              <div className="text-center">
                <div className="text-red-600 mb-2">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-red-900 mb-2">Prediction Failed</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </Card>
          )}

          {data && (
            <Card title="Fertilizer Recommendations" className="border-green-200 bg-green-50">
              <div className="space-y-6">
                {/* Nutrient Status */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Nutrient Status</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className={`status-chip ${getStatusColor(data.N_Status)}`}>
                      Nitrogen: {data.N_Status}
                    </span>
                    <span className={`status-chip ${getStatusColor(data.P_Status)}`}>
                      Phosphorus: {data.P_Status}
                    </span>
                    <span className={`status-chip ${getStatusColor(data.K_Status)}`}>
                      Potassium: {data.K_Status}
                    </span>
                  </div>
                </div>

                {/* Fertilizer Recommendations */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recommended Fertilizers</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <span className="font-medium">Primary:</span>
                      <span className="text-primary-600 font-semibold">{data.Primary_Fertilizer}</span>
                    </div>
                    {data.Secondary_Fertilizer && (
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                        <span className="font-medium">Secondary:</span>
                        <span className="text-gray-700">{data.Secondary_Fertilizer}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Organic Options */}
                {(data.Organic_1 || data.Organic_2 || data.Organic_3) && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Organic Alternatives</h4>
                    <div className="space-y-1">
                      {data.Organic_1 && <div className="text-sm text-gray-600">• {data.Organic_1}</div>}
                      {data.Organic_2 && <div className="text-sm text-gray-600">• {data.Organic_2}</div>}
                      {data.Organic_3 && <div className="text-sm text-gray-600">• {data.Organic_3}</div>}
                    </div>
                  </div>
                )}

                {/* pH Amendment */}
                {data.pH_Amendment && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">pH Amendment</h4>
                    <p className="text-sm text-gray-600">{data.pH_Amendment}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={handleViewDetails}
                    className="flex-1 btn-primary flex items-center justify-center"
                  >
                    View Details
                  </button>
                  <button
                    onClick={handleDownloadReport}
                    className="flex-1 btn-secondary flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}