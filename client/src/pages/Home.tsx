import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, BarChart3, Shield, Zap } from 'lucide-react'
import Card from '../components/Card'

export default function Home() {
  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Data-Driven Insights',
      description: 'Advanced ML algorithms analyze soil and environmental data for precise recommendations'
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: 'Sustainable Farming',
      description: 'Optimize fertilizer usage to reduce costs and environmental impact'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Proven Accuracy',
      description: 'Trained on extensive agricultural datasets with 99% accuracy'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Results',
      description: 'Get fertilizer recommendations in seconds, not days'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-green-100 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Smart Fertilizer
              <span className="text-primary-600 block">Recommendation</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Optimize your crop yield with AI-powered fertilizer recommendations. 
              Get personalized suggestions based on soil conditions, weather data, and crop requirements.
            </p>
            <Link
              to="/predict"
              className="inline-flex items-center btn-primary text-lg px-8 py-3 group"
            >
              Start Prediction
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our System?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our machine learning model considers multiple factors to provide the most accurate fertilizer recommendations for your specific farming conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Agricultural Insights
            </h2>
            <p className="text-lg text-gray-600">
              Visual data analysis from our research and model development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg bg-white shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={`/o${num}.png`}
                    alt={`Agricultural data visualization ${num}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400`
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">Data Analysis {num}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Visualization of agricultural patterns and trends
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Farming?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Get started with our AI-powered fertilizer recommendations today.
          </p>
          <Link
            to="/predict"
            className="inline-flex items-center bg-white text-primary-600 hover:bg-gray-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200 group"
          >
            Get Recommendations
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}