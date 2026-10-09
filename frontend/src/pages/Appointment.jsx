import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {

        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {

            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];


            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {

                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))

        }

    }

    const bookAppointment = async () => {

        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className='px-4 sm:px-6 pt-8 pb-20 max-w-7xl mx-auto'>

            {/* ---------- Doctor Details Card ----------- */}
            <div className='bg-white border border-border-light rounded-3xl shadow-card overflow-hidden flex flex-col md:flex-row'>
                {/* Left: Image Container */}
                <div className='md:w-1/3 lg:w-1/4 bg-primary-bg p-6 flex justify-center items-center'>
                    <img className='w-full max-w-xs aspect-square object-cover rounded-2xl shadow-sm border-4 border-white' src={docInfo.image} alt={docInfo.name} />
                </div>

                {/* Right: Info */}
                <div className='flex-1 p-8 sm:p-10'>
                    {/* ----- Doc Info : name, degree, experience ----- */}
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
                        <div>
                            <h1 className='flex items-center gap-2 text-3xl sm:text-4xl font-bold text-text-dark tracking-tight'>
                                {docInfo.name} 
                                <img className='w-6' src={assets.verified_icon} alt="Verified" />
                            </h1>
                            <div className='flex items-center gap-3 mt-2 text-text-muted font-medium text-lg'>
                                <p>{docInfo.degree} — {docInfo.speciality}</p>
                                <span className='px-3 py-1 bg-primary-light text-primary-dark text-sm rounded-full font-bold'>{docInfo.experience}</span>
                            </div>
                        </div>
                        
                        <div className='bg-background border border-border-light px-6 py-3 rounded-2xl text-center'>
                            <p className='text-text-muted text-sm uppercase tracking-wide font-semibold mb-1'>Consultation Fee</p>
                            <p className='text-2xl font-bold text-primary'>{currencySymbol}{docInfo.fees}</p>
                        </div>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div className='mt-8 pt-8 border-t border-border-light'>
                        <h3 className='flex items-center gap-2 text-lg font-bold text-text-dark mb-3'>
                            About Doctor <img className='w-4 opacity-70' src={assets.info_icon} alt="Info" />
                        </h3>
                        <p className='text-text-muted leading-relaxed'>{docInfo.about}</p>
                    </div>
                </div>
            </div>

            {/* Booking slots Section */}
            <div className='mt-12 bg-white border border-border-light rounded-3xl shadow-card p-8'>
                <h2 className='text-2xl font-bold text-text-dark mb-6'>Schedule Appointment</h2>
                
                {/* Date Selector */}
                <div className='flex gap-4 items-center w-full overflow-x-auto pb-4 scrollbar-hide'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div 
                            onClick={() => setSlotIndex(index)} 
                            key={index} 
                            className={`flex flex-col items-center justify-center min-w-[80px] h-24 rounded-2xl cursor-pointer transition-all duration-300 ${slotIndex === index ? 'bg-primary text-white shadow-md scale-105' : 'bg-background border border-border-light text-text-muted hover:border-primary hover:text-primary'}`}
                        >
                            <p className='text-sm font-semibold'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p className='text-2xl font-bold'>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                {/* Time Selector */}
                <div className='flex items-center gap-3 w-full overflow-x-auto mt-6 pb-4 scrollbar-hide'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p 
                            onClick={() => setSlotTime(item.time)} 
                            key={index} 
                            className={`text-sm font-medium flex-shrink-0 px-6 py-3 rounded-xl cursor-pointer transition-all duration-200 ${item.time === slotTime ? 'bg-primary text-white shadow-md scale-105' : 'bg-background border border-border-light text-text-dark hover:border-primary hover:text-primary'}`}
                        >
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button 
                    onClick={bookAppointment} 
                    className='mt-10 w-full sm:w-auto bg-primary hover:bg-primary-dark text-white text-lg font-bold px-12 py-4 rounded-xl shadow-sm transition-colors'
                >
                    Book Appointment
                </button>
            </div>

            {/* Listing Related Doctors */}
            <div className='mt-16'>
                <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
            </div>
        </div>
    ) : null
}

export default Appointment