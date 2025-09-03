import { useState } from 'react'
import { api, PredictionRequest, PredictionResponse } from '../lib/api'

interface UsePredictionState {
  data: PredictionResponse | null
  loading: boolean
  error: string | null
}

export function usePrediction() {
  const [state, setState] = useState<UsePredictionState>({
    data: null,
    loading: false,
    error: null,
  })

  const predict = async (payload: PredictionRequest) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const data = await api.predict(payload)
      setState({ data, loading: false, error: null })
      return data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setState(prev => ({ ...prev, loading: false, error: errorMessage }))
      throw error
    }
  }

  const reset = () => {
    setState({ data: null, loading: false, error: null })
  }

  return {
    ...state,
    predict,
    reset,
  }
}