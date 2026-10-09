import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import { useNavigate, Link } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col gap-16 md:gap-24'>
      <Header />
      
      <SpecialityMenu />
      
      {/* AI Features Section */}
      <div className='flex flex-col items-center gap-6 px-4 sm:px-6'>
        <div className='text-center max-w-2xl mx-auto'>
            <h2 className='text-3xl md:text-4xl font-bold text-text-dark mb-4'>AI-Powered Healthcare</h2>
            <p className='text-lg text-text-muted'>Get instant health insights and find the right specialist with MediConnect AI.</p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mt-8'>
          {/* Health Assistant Card */}
          <Link 
            to='/health-assistant'
            onClick={() => window.scrollTo(0, 0)}
            className='bg-white border border-border-light rounded-2xl p-8 hover:shadow-card-hover transition-all duration-300 cursor-pointer group relative overflow-hidden block' 
          >
            <div className='absolute -right-6 -top-6 w-24 h-24 bg-primary-bg rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500'></div>
            <div className='relative z-10'>
                <div className='w-14 h-14 bg-primary-bg text-primary rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm border border-primary-light'>
                    🤖
                </div>
                <h3 className='text-xl font-bold text-text-dark mb-3'>MediConnect AI</h3>
                <p className='text-text-muted leading-relaxed mb-6'>
                    Have a health-related question? Get instant general health information from our smart AI assistant.
                </p>
                <div className='inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all'>
                    Ask MediConnect AI <span>→</span>
                </div>
            </div>
          </Link>

          {/* Find Specialist Card */}
          <Link 
            to='/find-specialist'
            onClick={() => window.scrollTo(0, 0)}
            className='bg-white border border-border-light rounded-2xl p-8 hover:shadow-card-hover transition-all duration-300 cursor-pointer group relative overflow-hidden block' 
          >
            <div className='absolute -right-6 -top-6 w-24 h-24 bg-primary-bg rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500'></div>
            <div className='relative z-10'>
                <div className='w-14 h-14 bg-primary-bg text-primary rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm border border-primary-light'>
                    🩺
                </div>
                <h3 className='text-xl font-bold text-text-dark mb-3'>Symptom Checker</h3>
                <p className='text-text-muted leading-relaxed mb-6'>
                    Describe your symptoms and our AI will suggest the most appropriate medical specialty for you to consult.
                </p>
                <div className='inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all'>
                    Find a Specialist <span>→</span>
                </div>
            </div>
          </Link>
        </div>
      </div>

      <TopDoctors />
      
      <div className='mb-24'>
        <Banner />
      </div>
    </div>
  )
}

export default Home