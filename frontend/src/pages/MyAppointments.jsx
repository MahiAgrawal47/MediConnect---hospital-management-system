import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }   

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {

                console.log(response)

                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to make payment using stripe
    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className='px-4 sm:px-6 pt-8 pb-20 max-w-5xl mx-auto'>
            <div className='mb-8 border-b border-border-light pb-4'>
                <h1 className='text-3xl font-bold text-text-dark'>My Appointments</h1>
                <p className='text-text-muted mt-2'>Manage your upcoming and past medical appointments.</p>
            </div>

            <div className='flex flex-col gap-6'>
                {appointments.length === 0 && (
                    <div className='text-center py-16 bg-white border border-border-light rounded-2xl shadow-sm'>
                        <p className='text-text-muted text-lg'>You have no appointments yet.</p>
                        <button onClick={() => navigate('/doctors')} className='mt-4 bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary-dark transition-colors font-medium'>Book an Appointment</button>
                    </div>
                )}

                {appointments.map((item, index) => (
                    <div key={index} className='bg-white border border-border-light rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-card transition-all'>
                        {/* Doctor Info */}
                        <div className='flex items-start gap-5 flex-1'>
                            <img className='w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover border border-border-light bg-primary-bg' src={item.docData.image} alt={item.docData.name} />
                            <div>
                                <h2 className='text-xl font-bold text-text-dark'>{item.docData.name}</h2>
                                <p className='text-primary font-semibold text-sm mb-3'>{item.docData.speciality}</p>
                                
                                <div className='space-y-1.5 text-sm text-text-muted'>
                                    <p className='flex items-center gap-2'>
                                        <span className='font-semibold text-text-dark'>Date & Time:</span> 
                                        {slotDateFormat(item.slotDate)} | {item.slotTime}
                                    </p>
                                    <p className='flex items-start gap-2 mt-1'>
                                        <span className='font-semibold text-text-dark whitespace-nowrap'>Address:</span> 
                                        <span>{item.docData.address.line1}<br/>{item.docData.address.line2}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className='flex flex-col justify-end gap-3 md:min-w-[200px] border-t md:border-t-0 md:border-l border-border-light pt-5 md:pt-0 md:pl-6'>
                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                <button onClick={() => setPayment(item._id)} className='w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-xl transition-colors shadow-sm'>Pay Online</button>
                            )}
                            
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                <button onClick={() => appointmentStripe(item._id)} className='w-full border border-border-light hover:bg-gray-50 py-2.5 rounded-xl transition-colors flex items-center justify-center shadow-sm'>
                                    <img className='max-w-[80px] h-auto' src={assets.stripe_logo} alt="Stripe" />
                                </button>
                            )}
                            
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                <button onClick={() => appointmentRazorpay(item._id)} className='w-full border border-border-light hover:bg-gray-50 py-2.5 rounded-xl transition-colors flex items-center justify-center shadow-sm'>
                                    <img className='max-w-[80px] h-auto' src={assets.razorpay_logo} alt="Razorpay" />
                                </button>
                            )}
                            
                            {!item.cancelled && item.payment && !item.isCompleted && (
                                <div className='w-full bg-green-50 text-green-700 font-semibold py-2.5 rounded-xl text-center border border-green-200'>Paid</div>
                            )}

                            {item.isCompleted && (
                                <div className='w-full bg-green-50 text-green-700 font-semibold py-2.5 rounded-xl text-center border border-green-200'>Completed</div>
                            )}

                            {!item.cancelled && !item.isCompleted && (
                                <button onClick={() => cancelAppointment(item._id)} className='w-full border border-red-200 text-red-600 hover:bg-red-50 font-semibold py-2.5 rounded-xl transition-colors'>Cancel Appointment</button>
                            )}
                            
                            {item.cancelled && !item.isCompleted && (
                                <div className='w-full bg-red-50 text-red-600 font-semibold py-2.5 rounded-xl text-center border border-red-200'>Cancelled</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments
