import { z } from 'zod'

export const predictionSchema = z.object({
  Temperature: z.number()
    .min(-10, 'Temperature must be at least -10°C')
    .max(50, 'Temperature must be at most 50°C'),
  Humidity: z.number()
    .min(0, 'Humidity must be at least 0%')
    .max(100, 'Humidity must be at most 100%'),
  Moisture: z.number()
    .min(0, 'Moisture must be at least 0%')
    .max(100, 'Moisture must be at most 100%'),
  Soil_Type: z.string()
    .min(1, 'Please select a soil type'),
  Crop: z.string()
    .min(1, 'Please select a crop'),
  Nitrogen: z.number()
    .min(0, 'Nitrogen must be at least 0')
    .max(200, 'Nitrogen must be at most 200'),
  Phosphorus: z.number()
    .min(0, 'Phosphorus must be at least 0')
    .max(200, 'Phosphorus must be at most 200'),
  Potassium: z.number()
    .min(0, 'Potassium must be at least 0')
    .max(200, 'Potassium must be at most 200'),
  pH: z.number()
    .min(3, 'pH must be at least 3')
    .max(10, 'pH must be at most 10'),
  Sowing_Date: z.string()
    .min(1, 'Please select a sowing date'),
  Field_Size: z.number()
    .min(0.1, 'Field size must be at least 0.1')
    .max(10000, 'Field size must be at most 10,000'),
  unit: z.string()
    .min(1, 'Please select a unit'),
})

export type PredictionFormData = z.infer<typeof predictionSchema>