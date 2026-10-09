import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='px-4 sm:px-6 pt-8 pb-20 max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-16'>
            <h1 className='text-4xl font-bold text-text-dark'>About <span className='text-primary'>MediConnect</span></h1>
            <p className='text-text-muted mt-4 max-w-2xl mx-auto text-lg'>Revolutionizing healthcare access with intelligent technology and a patient-first approach.</p>
        </div>

        {/* Hero Content */}
        <div className='flex flex-col lg:flex-row gap-12 items-center mb-24'>
            <div className='w-full lg:w-5/12 relative'>
                <div className='absolute inset-0 bg-primary/10 rounded-3xl transform translate-x-4 translate-y-4'></div>
                <img className='w-full h-auto rounded-3xl object-cover relative z-10 shadow-lg' src={assets.about_image} alt="About MediConnect" />
            </div>
            
            <div className='flex flex-col justify-center gap-8 lg:w-7/12'>
                <div className='space-y-6 text-text-muted text-lg leading-relaxed'>
                    <p>Welcome to MediConnect, your trusted partner in managing your healthcare needs conveniently and efficiently. At MediConnect, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
                    <p>MediConnect is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, MediConnect is here to support you every step of the way.</p>
                </div>
                
                <div className='bg-primary-bg border border-primary-light p-8 rounded-2xl'>
                    <h3 className='text-xl font-bold text-primary-dark mb-3 flex items-center gap-2'>
                        <span className='text-2xl'>🎯</span> Our Vision
                    </h3>
                    <p className='text-primary-dark/80 font-medium leading-relaxed'>
                        Our vision at MediConnect is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
                    </p>
                </div>
            </div>
        </div>

        {/* Features Section */}
        <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-text-dark'>Why Choose <span className='text-primary'>Us</span></h2>
            <p className='text-text-muted mt-3'>The pillars of the MediConnect experience.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white border border-border-light rounded-2xl p-8 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group'>
                <div className='w-16 h-16 bg-primary-bg rounded-2xl flex items-center justify-center text-primary text-2xl mb-6 group-hover:scale-110 transition-transform'>
                    ⚡
                </div>
                <h3 className='text-xl font-bold text-text-dark mb-4'>Efficiency</h3>
                <p className='text-text-muted leading-relaxed'>Streamlined appointment scheduling that seamlessly fits into your busy lifestyle without the wait.</p>
            </div>
            
            <div className='bg-white border border-border-light rounded-2xl p-8 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group'>
                <div className='w-16 h-16 bg-primary-bg rounded-2xl flex items-center justify-center text-primary text-2xl mb-6 group-hover:scale-110 transition-transform'>
                    🤝
                </div>
                <h3 className='text-xl font-bold text-text-dark mb-4'>Convenience</h3>
                <p className='text-text-muted leading-relaxed'>Instant access to a vast network of trusted, verified healthcare professionals right in your area.</p>
            </div>
            
            <div className='bg-white border border-border-light rounded-2xl p-8 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group'>
                <div className='w-16 h-16 bg-primary-bg rounded-2xl flex items-center justify-center text-primary text-2xl mb-6 group-hover:scale-110 transition-transform'>
                    ✨
                </div>
                <h3 className='text-xl font-bold text-text-dark mb-4'>Personalization</h3>
                <p className='text-text-muted leading-relaxed'>Tailored health recommendations and timely reminders to help you stay proactively on top of your health.</p>
            </div>
        </div>
    </div>
  )
}

export default About
