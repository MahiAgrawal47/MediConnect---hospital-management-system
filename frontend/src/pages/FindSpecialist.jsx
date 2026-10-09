import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FindSpecialist = () => {

  const { backendUrl } = useContext(AppContext)
  const navigate = useNavigate()

  const [symptoms, setSymptoms] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!symptoms.trim() || loading) return

    setLoading(true)
    setResult(null)
    setError('')

    try {
      const { data } = await axios.post(backendUrl + '/api/ai/suggest-specialist', { symptoms: symptoms.trim() })

      if (data.success) {
        setResult({
          specialty: data.specialty,
          reason: data.reason
        })
      } else {
        setError(data.message || 'Could not process your request. Please try again.')
      }
    } catch (err) {
      console.log(err)
      setError('AI service is currently unavailable. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const exampleDescriptions = [
    "I have skin rashes and itching",
    "I have frequent stomach pain and bloating",
    "I get frequent headaches and dizziness",
    "My child has a persistent cough and fever"
  ]

  return (
    <div className='pb-20 pt-8 px-4 sm:px-6'>
      <div className='max-w-2xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col items-center text-center mb-8'>
          <div className='w-16 h-16 bg-primary-bg text-primary rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-primary-light mb-4'>🩺</div>
          <h1 className='text-3xl font-bold text-text-dark'>Symptom Checker</h1>
          <p className='text-text-muted mt-2 max-w-md mx-auto'>Describe your symptoms in detail, and our AI will suggest the most appropriate medical specialist for your condition.</p>
        </div>

        {/* Disclaimer */}
        <div className='mb-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3 text-sm text-yellow-800 shadow-sm'>
          <span className='text-xl shrink-0'>⚕️</span>
          <p><strong>Disclaimer:</strong> This tool suggests a medical specialty based on your description. It does not diagnose diseases. Always consult a qualified healthcare provider for medical decisions.</p>
        </div>

        {/* Input Form */}
        <div className='bg-white border border-border-light rounded-2xl p-6 md:p-8 shadow-card'>
          <form onSubmit={handleSubmit}>
            <label className='block text-sm font-bold text-text-dark mb-3 tracking-wide'>
              DESCRIBE YOUR HEALTH CONCERN
            </label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder='e.g., I have been experiencing a persistent dull ache in my lower back for the past week, along with occasional numbness in my right leg...'
              className='w-full bg-background border border-border-light rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none text-text-dark placeholder-text-muted shadow-inner'
              rows={5}
              disabled={loading}
            />

            {/* Example pills */}
            <div className='mt-4 flex flex-wrap items-center gap-2'>
              <span className='text-xs font-semibold text-text-muted uppercase tracking-wider mr-2'>Examples:</span>
              {exampleDescriptions.map((desc, i) => (
                <button
                  key={i}
                  type='button'
                  onClick={() => setSymptoms(desc)}
                  className='text-xs bg-white border border-border-light text-text-muted px-3 py-1.5 rounded-lg hover:border-primary hover:text-primary transition-all duration-200 shadow-sm'
                >
                  {desc}
                </button>
              ))}
            </div>

            <button
              type='submit'
              disabled={loading || !symptoms.trim()}
              className='mt-8 w-full bg-primary text-white py-4 rounded-xl text-sm font-bold hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'
            >
              {loading ? (
                <span className='flex items-center justify-center gap-3'>
                  <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
                  </svg>
                  Analyzing Symptoms...
                </span>
              ) : 'Find Specialist'}
            </button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className='mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600 flex gap-3 shadow-sm'>
             <span className='text-xl shrink-0'>⚠️</span>
             <p>{error}</p>
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className='mt-8 bg-white border border-border-light rounded-2xl p-6 md:p-8 shadow-card-hover animate-fadeIn'>
            <div className='flex items-start gap-4 mb-6'>
              <div className='w-12 h-12 bg-primary-bg rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border border-primary-light shadow-sm'>
                👨‍⚕️
              </div>
              <div>
                <p className='text-sm font-semibold text-text-muted tracking-wide uppercase mb-1'>Recommended Specialist</p>
                <p className='text-2xl font-bold text-text-dark'>{result.specialty}</p>
                <div className='mt-3 bg-background border border-border-light rounded-lg p-4'>
                    <p className='text-sm text-text-dark leading-relaxed'><strong>Why:</strong> {result.reason}</p>
                </div>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 mt-8'>
                <button
                onClick={() => { navigate(`/doctors/${result.specialty}`); window.scrollTo(0, 0) }}
                className='flex-1 bg-primary text-white py-3 rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors shadow-sm text-center'
                >
                Book a {result.specialty}
                </button>

                <button
                onClick={() => { setResult(null); setSymptoms('') }}
                className='flex-1 bg-white border border-border-light text-text-dark py-3 rounded-xl text-sm font-bold hover:bg-background transition-colors shadow-sm'
                >
                Check New Symptoms
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FindSpecialist
