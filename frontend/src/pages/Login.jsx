import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {

      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6'>
        <form onSubmit={onSubmitHandler} className='w-full max-w-md'>
            <div className='bg-white flex flex-col gap-5 p-8 sm:p-10 border border-border-light rounded-3xl shadow-card w-full'>
                <div className='text-center mb-4'>
                    <h2 className='text-3xl font-bold text-text-dark mb-2'>
                        {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className='text-text-muted'>
                        {state === 'Sign Up' ? 'Join MediConnect to easily manage your healthcare.' : 'Log in to access your appointments and records.'}
                    </p>
                </div>

                {state === 'Sign Up' && (
                    <div className='w-full'>
                        <label className='block text-sm font-semibold text-text-dark mb-1.5'>Full Name</label>
                        <input 
                            onChange={(e) => setName(e.target.value)} 
                            value={name} 
                            className='w-full bg-background border border-border-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-text-dark' 
                            type="text" 
                            placeholder="John Doe"
                            required 
                        />
                    </div>
                )}
                
                <div className='w-full'>
                    <label className='block text-sm font-semibold text-text-dark mb-1.5'>Email Address</label>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        className='w-full bg-background border border-border-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-text-dark' 
                        type="email" 
                        placeholder="you@example.com"
                        required 
                    />
                </div>
                
                <div className='w-full'>
                    <label className='block text-sm font-semibold text-text-dark mb-1.5'>Password</label>
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        className='w-full bg-background border border-border-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-text-dark' 
                        type="password" 
                        placeholder="••••••••"
                        required 
                    />
                </div>

                <button type="submit" className='w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 mt-2 rounded-xl text-base transition-colors shadow-sm'>
                    {state === 'Sign Up' ? 'Create Account' : 'Log In'}
                </button>
                
                <div className='text-center mt-2'>
                    {state === 'Sign Up' ? (
                        <p className='text-sm text-text-muted'>
                            Already have an account?{' '}
                            <span onClick={() => setState('Login')} className='text-primary font-semibold cursor-pointer hover:underline'>Log in here</span>
                        </p>
                    ) : (
                        <p className='text-sm text-text-muted'>
                            Don't have an account?{' '}
                            <span onClick={() => setState('Sign Up')} className='text-primary font-semibold cursor-pointer hover:underline'>Create one here</span>
                        </p>
                    )}
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login