import React, { useContext, useState, useRef, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const HealthAssistant = () => {

  const { backendUrl } = useContext(AppContext)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatContainerRef = useRef(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const { data } = await axios.post(backendUrl + '/api/ai/health-chat', { message: userMessage })

      if (data.success) {
        setMessages(prev => [...prev, { role: 'ai', content: data.response }])
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: data.message || 'Sorry, I could not process your request. Please try again.' }])
      }
    } catch (error) {
      console.log(error)
      setMessages(prev => [...prev, { role: 'ai', content: 'Sorry, the AI service is currently unavailable. Please try again later.' }])
    } finally {
      setLoading(false)
    }
  }

  const suggestedQuestions = [
    "What are common symptoms of flu?",
    "What is a normal blood pressure?",
    "How should I prepare for a blood test?",
    "What are the benefits of regular exercise?"
  ]

  return (
    <div className='pb-20 pt-8 px-4 sm:px-6'>
      <div className='max-w-3xl mx-auto'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-4'>
          <div className='w-12 h-12 bg-primary-bg text-primary rounded-xl flex items-center justify-center text-2xl shadow-sm border border-primary-light'>🤖</div>
          <div>
            <h1 className='text-2xl font-bold text-text-dark'>MediConnect AI</h1>
            <p className='text-text-muted text-sm'>Your healthcare information assistant</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className='mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3 text-sm text-yellow-800 shadow-sm'>
          <span className='text-xl shrink-0'>⚕️</span>
          <p><strong>Disclaimer:</strong> MediConnect AI provides general health information and is not a substitute for professional medical advice. Always consult a qualified healthcare provider for medical decisions.</p>
        </div>

        {/* Chat Interface */}
        <div className='bg-white border border-border-light rounded-2xl shadow-card overflow-hidden flex flex-col'>
          {/* Messages Area */}
          <div ref={chatContainerRef} className='h-[50vh] min-h-[400px] overflow-y-auto p-6 bg-background space-y-6'>
            {messages.length === 0 && (
              <div className='flex flex-col items-center justify-center h-full text-center space-y-6'>
                <div className='w-20 h-20 bg-primary-bg rounded-full flex items-center justify-center text-4xl shadow-sm'>🏥</div>
                <div>
                  <h3 className='text-xl font-bold text-text-dark mb-2'>How can I help you today?</h3>
                  <p className='text-text-muted max-w-md mx-auto'>Ask any general health-related questions. Select a topic below or type your own question.</p>
                </div>
                
                <div className='flex flex-wrap justify-center gap-3 max-w-lg'>
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(q)}
                      className='bg-white border border-border-light text-text-muted px-4 py-2 rounded-lg text-sm hover:border-primary hover:text-primary hover:shadow-sm transition-all duration-200 text-left'
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'ai' && (
                  <div className='w-8 h-8 rounded-full bg-primary-bg flex items-center justify-center text-sm mr-3 shrink-0 border border-primary-light'>🤖</div>
                )}
                <div className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-br-sm'
                    : 'bg-white border border-border-light text-text-dark rounded-bl-sm'
                }`}>
                  <div className='whitespace-pre-wrap'>{msg.content}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className='flex justify-start'>
                <div className='w-8 h-8 rounded-full bg-primary-bg flex items-center justify-center text-sm mr-3 shrink-0 border border-primary-light'>🤖</div>
                <div className='bg-white border border-border-light px-5 py-4 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5'>
                  <div className='w-2 h-2 bg-primary/60 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></div>
                  <div className='w-2 h-2 bg-primary/60 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></div>
                  <div className='w-2 h-2 bg-primary/60 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className='p-4 bg-white border-t border-border-light'>
            <form onSubmit={sendMessage} className='flex gap-3 relative'>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Type your health question...'
                className='flex-1 border border-border-light bg-background rounded-xl pl-4 pr-24 py-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text-dark placeholder-text-muted shadow-inner'
                disabled={loading}
              />
              <button
                type='submit'
                disabled={loading || !input.trim()}
                className='absolute right-2 top-2 bottom-2 bg-primary text-white px-6 rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthAssistant
