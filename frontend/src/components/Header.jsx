import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Header = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col lg:flex-row items-center gap-10 lg:gap-20 py-12 lg:py-24 px-4 sm:px-6'>
            {/* --------- Header Left --------- */}
            <div className='lg:w-1/2 flex flex-col items-start justify-center gap-6'>
                <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-bg text-primary-dark text-sm font-semibold border border-primary-light'>
                    <span className='w-2 h-2 rounded-full bg-primary'></span>
                    Your Healthcare, Connected.
                </div>
                <h1 className='text-4xl sm:text-5xl lg:text-6xl text-text-dark font-extrabold leading-tight tracking-tight'>
                    Find and Book <br />
                    <span className='text-primary'>Trusted Doctors</span> <br />
                    Instantly.
                </h1>
                <p className='text-text-muted text-lg sm:text-xl font-normal leading-relaxed max-w-lg'>
                    Skip the waiting room. Browse through our extensive network of certified healthcare professionals and schedule your appointment hassle-free.
                </p>
                
                <div className='flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto'>
                    <a href='#speciality' className='w-full sm:w-auto text-center bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold shadow-card transition-all duration-300'>
                        Book an Appointment
                    </a>
                    <button onClick={() => { navigate('/health-assistant'); window.scrollTo(0, 0); }} className='w-full sm:w-auto text-center bg-white hover:bg-background text-text-dark border border-border-light px-8 py-4 rounded-xl font-semibold shadow-sm transition-all duration-300'>
                        Ask AI Assistant
                    </button>
                </div>

                <div className='flex items-center gap-4 mt-6 pt-6 border-t border-border-light w-full'>
                    <div className='flex -space-x-4'>
                        {doctors.slice(0, 4).map((doc, index) => (
                            <img key={index} className='w-12 h-12 rounded-full border-2 border-white object-cover bg-primary-bg' src={doc.image} alt={doc.name} />
                        ))}
                    </div>
                    <div className='flex flex-col ml-2'>
                        <span className='text-text-dark font-bold text-lg'>{doctors.length > 0 ? `${doctors.length}+` : 'Many'}</span>
                        <span className='text-text-muted text-sm'>Verified Specialists</span>
                    </div>
                </div>
            </div>

            {/* --------- Header Right --------- */}
            <div className='lg:w-1/2 relative flex justify-center lg:justify-end mt-10 lg:mt-0'>
                {/* Decorative background blob/shape */}
                <div className='absolute inset-0 bg-primary-light/50 rounded-full blur-3xl scale-90 -z-10'></div>
                <img className='w-full max-w-md lg:max-w-lg object-cover rounded-3xl shadow-card border-4 border-white' src={assets.hero_doctor_image} alt="Doctors" />
                
                {/* Floating Badge */}
                <div className='absolute bottom-10 -left-6 sm:-left-10 bg-white p-4 rounded-2xl shadow-card border border-border-light flex items-center gap-3'>
                    <div className='w-12 h-12 bg-primary-bg rounded-full flex items-center justify-center text-xl'>⭐</div>
                    <div>
                        <p className='text-text-dark font-bold'>Top Rated</p>
                        <p className='text-text-muted text-xs'>Specialists</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header