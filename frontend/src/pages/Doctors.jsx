import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  const specialtiesList = [
    'General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'
  ]

  return (
    <div className='px-4 sm:px-6 pt-6 pb-20'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-text-dark mb-2'>Find Doctors</h1>
        <p className='text-text-muted'>Browse our extensive list of specialist doctors and book your appointment.</p>
      </div>

      <div className='flex flex-col lg:flex-row items-start gap-8'>
        {/* Mobile Filter Toggle */}
        <button 
          onClick={() => setShowFilter(!showFilter)} 
          className={`lg:hidden w-full py-3 px-4 border border-border-light rounded-xl text-sm font-semibold transition-all flex justify-between items-center ${showFilter ? 'bg-primary text-white border-primary' : 'bg-white text-text-dark shadow-sm'}`}
        >
          <span>Filter by Specialty</span>
          <span>{showFilter ? '▲' : '▼'}</span>
        </button>

        {/* Sidebar Filters */}
        <div className={`w-full lg:w-64 flex-shrink-0 flex-col gap-2 ${showFilter ? 'flex' : 'hidden lg:flex'}`}>
          <div className='bg-white border border-border-light rounded-2xl p-2 shadow-sm'>
            {specialtiesList.map((spec) => (
              <p 
                key={spec}
                onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)} 
                className={`px-4 py-3 rounded-xl transition-all cursor-pointer text-sm font-medium mb-1 last:mb-0 ${speciality === spec ? 'bg-primary-bg text-primary-dark shadow-sm border border-primary-light' : 'text-text-muted hover:bg-background hover:text-text-dark'}`}
              >
                {spec}
              </p>
            ))}
          </div>
        </div>

        {/* Doctor Grid */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filterDoc.map((item, index) => (
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
    </div>
  )
}

export default Doctors