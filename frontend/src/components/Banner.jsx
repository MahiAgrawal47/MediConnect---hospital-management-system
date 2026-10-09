import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className='relative overflow-hidden bg-text-dark rounded-3xl mx-4 sm:mx-6 shadow-2xl flex flex-col md:flex-row items-center'>
            {/* Background Pattern/Gradient */}
            <div className='absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-dark/40 to-transparent -z-10'></div>
            <div className='absolute -top-24 -left-24 w-64 h-64 bg-primary rounded-full blur-3xl opacity-20 -z-10'></div>

            {/* ------- Left Side ------- */}
            <div className='flex-1 py-12 px-8 sm:px-12 md:py-20 lg:py-24 z-10'>
                <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6'>
                    Ready to prioritize <br className='hidden md:block' />
                    <span className='text-primary-light'>your health?</span>
                </h2>
                <p className='text-gray-300 text-lg mb-8 max-w-md'>
                    Join thousands of patients who have already transformed their healthcare experience with MediConnect.
                </p>
                <div className='flex flex-col sm:flex-row gap-4'>
                    <button 
                        onClick={() => { navigate('/login'); window.scrollTo(0, 0) }} 
                        className='bg-white text-text-dark font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-sm w-full sm:w-auto'
                    >
                        Create an Account
                    </button>
                    <button 
                        onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }} 
                        className='bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-dark border border-primary-dark transition-colors shadow-sm w-full sm:w-auto'
                    >
                        Browse Doctors
                    </button>
                </div>
            </div>

            {/* ------- Right Side ------- */}
            <div className='hidden md:flex md:w-5/12 lg:w-1/3 relative justify-end items-end h-full pt-12 pr-12 z-10'>
                <img className='w-full max-w-sm object-contain drop-shadow-2xl' src={assets.appointment_img} alt="Book Appointment" />
            </div>
        </div>
    )
}

export default Banner