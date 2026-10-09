import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    if (relDoc.length === 0) return null

    return (
        <div className='flex flex-col items-center gap-6 mb-16'>
            <div className='text-center max-w-2xl mx-auto'>
                <h2 className='text-3xl md:text-4xl font-bold text-text-dark mb-4'>Related Specialists</h2>
                <p className='text-lg text-text-muted'>Other highly-rated doctors in the same specialty.</p>
            </div>
            
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-8'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div 
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} 
                        className='bg-white border border-border-light rounded-2xl p-4 cursor-pointer hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col group' 
                        key={index}
                    >
                        {/* Image Container */}
                        <div className='relative w-full aspect-square rounded-xl overflow-hidden bg-primary-bg mb-4'>
                            <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
                            <div className='absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm'>
                                <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-400"}`}></span>
                                <span className={`text-xs font-semibold ${item.available ? 'text-green-600' : "text-gray-500"}`}>
                                    {item.available ? 'Available' : "Busy"}
                                </span>
                            </div>
                        </div>
                        
                        {/* Details */}
                        <div className='flex flex-col flex-grow'>
                            <h3 className='text-lg font-bold text-text-dark group-hover:text-primary transition-colors'>{item.name}</h3>
                            <p className='text-text-muted text-sm font-medium mb-3'>{item.speciality}</p>
                            <div className='mt-auto pt-4 border-t border-border-light flex items-center justify-end'>
                                <span className='text-primary text-sm font-semibold'>Book →</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedDoctors