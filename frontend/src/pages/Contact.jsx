import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='px-4 sm:px-6 pt-8 pb-20 max-w-7xl mx-auto'>

      <div className='text-center mb-16'>
        <h1 className='text-4xl font-bold text-text-dark'>Contact <span className='text-primary'>Us</span></h1>
        <p className='text-text-muted mt-4 max-w-2xl mx-auto text-lg'>We're here to help. Reach out to us for any questions or support.</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-12 items-center mb-28'>
        <div className='w-full lg:w-1/2 relative'>
            <div className='absolute inset-0 bg-primary/10 rounded-3xl transform -translate-x-4 translate-y-4'></div>
            <img className='w-full h-auto rounded-3xl object-cover relative z-10 shadow-lg' src={assets.contact_image} alt="Contact MediConnect" />
        </div>

        <div className='w-full lg:w-1/2 flex flex-col gap-8'>
          {/* Office Card */}
          <div className='bg-white border border-border-light rounded-3xl p-8 shadow-sm hover:shadow-card transition-shadow duration-300'>
            <div className='w-12 h-12 bg-primary-bg rounded-xl flex items-center justify-center text-primary text-xl mb-6'>
                📍
            </div>
            <h3 className='font-bold text-xl text-text-dark mb-4'>Our Office</h3>
            <p className='text-text-muted leading-relaxed mb-4'>
                54709 Willms Station <br /> 
                Suite 350, Washington, USA
            </p>
            <div className='space-y-2'>
                <p className='text-text-muted'><strong className='text-text-dark'>Tel:</strong> (415) 555-0132</p>
                <p className='text-text-muted'><strong className='text-text-dark'>Email:</strong> contact@mediconnect.com</p>
            </div>
          </div>

          {/* Careers Card */}
          <div className='bg-background border border-border-light rounded-3xl p-8 shadow-sm hover:shadow-card transition-shadow duration-300'>
            <div className='w-12 h-12 bg-white border border-border-light rounded-xl flex items-center justify-center text-primary text-xl mb-6 shadow-sm'>
                💼
            </div>
            <h3 className='font-bold text-xl text-text-dark mb-4'>Careers at MediConnect</h3>
            <p className='text-text-muted leading-relaxed mb-6'>
                Join our mission to revolutionize healthcare. Learn more about our teams and current job openings.
            </p>
            <button className='bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-3.5 rounded-xl transition-colors duration-300 shadow-sm'>
                Explore Jobs
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contact
