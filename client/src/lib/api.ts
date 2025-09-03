const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export interface PredictionRequest {
  Temperature: number
  Humidity: number
  Moisture: number
  Soil_Type: string
  Crop: string
  Nitrogen: number
  Phosphorus: number
  Potassium: number
  pH: number
  Sowing_Date: string
  Field_Size: number
  unit: string
}

export interface PredictionResponse {
  N_Status: 'Low' | 'Optimal' | 'High'
  P_Status: 'Low' | 'Optimal' | 'High'
  K_Status: 'Low' | 'Optimal' | 'High'
  Primary_Fertilizer: string
  Secondary_Fertilizer: string
  Organic_1: string
  Organic_2: string
  Organic_3: string
  pH_Amendment: string
  meta: {
    model: string
    version: string
  }
}

export const api = {
  async predict(payload: PredictionRequest): Promise<PredictionResponse> {
    const response = await fetch(`${BASE_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }))
      throw new Error(error.message || 'Prediction failed')
    }

    return response.json()
  },

  async downloadReport(jobId?: string): Promise<void> {
    try {
      const url = jobId 
        ? `${BASE_URL}/api/report?jobId=${jobId}`
        : `${BASE_URL}/pdf.pdf`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Failed to download report')
      }

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `fertilizer-report-${Date.now()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Download failed:', error)
      throw error
    }
  }
}