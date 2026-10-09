import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-6 px-4 sm:px-6'>
            <div className='text-center max-w-2xl mx-auto'>
                <h2 className='text-3xl md:text-4xl font-bold text-text-dark mb-4'>Browse Specialities</h2>
                <p className='text-lg text-text-muted'>Find the right care for your needs. Select a specialty to view our certified experts.</p>
            </div>
            
            <div className='flex gap-4 pt-8 w-full overflow-x-auto pb-6 scrollbar-hide snap-x justify-start xl:justify-center'>
                {specialityData.map((item, index) => (
                    <Link 
                        to={`/doctors/${item.speciality}`} 
                        onClick={() => window.scrollTo(0, 0)} 
                        className='flex items-center gap-3 bg-white border border-border-light px-6 py-4 rounded-2xl cursor-pointer flex-shrink-0 hover:border-primary hover:shadow-md transition-all duration-300 snap-center group' 
                        key={index}
                    >
                        <div className='w-12 h-12 bg-background rounded-full flex items-center justify-center group-hover:bg-primary-light transition-colors'>
                            <img className='w-8 h-8 object-contain' src={item.image} alt={item.speciality} />
                        </div>
                        <p className='font-semibold text-text-dark group-hover:text-primary transition-colors'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu