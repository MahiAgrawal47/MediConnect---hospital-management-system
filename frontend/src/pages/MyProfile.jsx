import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Function to update user profile data using API
    const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    return userData ? (
        <div className='px-4 sm:px-6 pt-8 pb-20 max-w-4xl mx-auto'>
            <div className='mb-8 border-b border-border-light pb-4 flex justify-between items-end'>
                <div>
                    <h1 className='text-3xl font-bold text-text-dark'>My Profile</h1>
                    <p className='text-text-muted mt-2'>Manage your personal information and preferences.</p>
                </div>
                <div className='hidden md:block'>
                    {isEdit ? (
                        <button onClick={updateUserProfileData} className='bg-primary hover:bg-primary-dark text-white font-bold px-6 py-2.5 rounded-lg transition-colors shadow-sm'>Save Changes</button>
                    ) : (
                        <button onClick={() => setIsEdit(true)} className='bg-white border border-border-light hover:border-primary hover:text-primary text-text-dark font-bold px-6 py-2.5 rounded-lg transition-colors shadow-sm'>Edit Profile</button>
                    )}
                </div>
            </div>

            <div className='bg-white border border-border-light rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row'>
                {/* Left Sidebar / Avatar */}
                <div className='md:w-1/3 bg-background border-b md:border-b-0 md:border-r border-border-light p-8 flex flex-col items-center justify-center text-center'>
                    <div className='relative mb-6 group'>
                        {isEdit ? (
                            <label htmlFor='image' className='cursor-pointer block relative'>
                                <img className='w-40 h-40 rounded-full object-cover border-4 border-white shadow-md opacity-70 group-hover:opacity-50 transition-opacity' src={image ? URL.createObjectURL(image) : userData.image} alt="Profile" />
                                <div className='absolute inset-0 flex flex-col items-center justify-center text-white font-bold drop-shadow-md pointer-events-none'>
                                    <img className='w-8 mb-1 filter invert' src={assets.upload_icon} alt="Upload" />
                                    <span className='text-sm'>Change Photo</span>
                                </div>
                                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                            </label>
                        ) : (
                            <img className='w-40 h-40 rounded-full object-cover border-4 border-white shadow-md' src={userData.image} alt="Profile" />
                        )}
                    </div>

                    {isEdit ? (
                        <input 
                            className='bg-white border border-border-light rounded-lg px-4 py-2 text-xl font-bold text-center w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all' 
                            type="text" 
                            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                            value={userData.name} 
                            placeholder="Full Name"
                        />
                    ) : (
                        <h2 className='text-2xl font-bold text-text-dark'>{userData.name}</h2>
                    )}
                    <p className='text-text-muted mt-2 flex items-center justify-center gap-2'>
                        <span className='w-2 h-2 rounded-full bg-green-500'></span> Active Patient
                    </p>
                    
                    {/* Mobile Edit Button inside card */}
                    <div className='mt-6 md:hidden w-full'>
                        {!isEdit && (
                            <button onClick={() => setIsEdit(true)} className='w-full bg-white border border-border-light hover:border-primary hover:text-primary text-text-dark font-bold px-6 py-2.5 rounded-lg transition-colors shadow-sm'>Edit Profile</button>
                        )}
                    </div>
                </div>

                {/* Right Content / Details */}
                <div className='flex-1 p-8 sm:p-10'>
                    {/* Contact Info */}
                    <div className='mb-10'>
                        <h3 className='text-sm font-bold text-text-muted uppercase tracking-wider mb-6 pb-2 border-b border-border-light'>Contact Information</h3>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8'>
                            <div>
                                <p className='text-sm font-semibold text-text-muted mb-1'>Email Address</p>
                                <p className='text-text-dark font-medium'>{userData.email}</p>
                            </div>
                            <div>
                                <p className='text-sm font-semibold text-text-muted mb-1'>Phone Number</p>
                                {isEdit ? (
                                    <input 
                                        className='w-full bg-background border border-border-light rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors' 
                                        type="text" 
                                        onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                        value={userData.phone} 
                                    />
                                ) : (
                                    <p className='text-text-dark font-medium'>{userData.phone}</p>
                                )}
                            </div>
                            <div className='sm:col-span-2'>
                                <p className='text-sm font-semibold text-text-muted mb-1'>Residential Address</p>
                                {isEdit ? (
                                    <div className='space-y-3'>
                                        <input 
                                            className='w-full bg-background border border-border-light rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors' 
                                            type="text" 
                                            placeholder="Line 1"
                                            onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                            value={userData.address.line1} 
                                        />
                                        <input 
                                            className='w-full bg-background border border-border-light rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors' 
                                            type="text" 
                                            placeholder="Line 2"
                                            onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                            value={userData.address.line2} 
                                        />
                                    </div>
                                ) : (
                                    <p className='text-text-dark font-medium leading-relaxed'>{userData.address.line1}<br/>{userData.address.line2}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div>
                        <h3 className='text-sm font-bold text-text-muted uppercase tracking-wider mb-6 pb-2 border-b border-border-light'>Basic Information</h3>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8'>
                            <div>
                                <p className='text-sm font-semibold text-text-muted mb-1'>Gender</p>
                                {isEdit ? (
                                    <select 
                                        className='w-full bg-background border border-border-light rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors' 
                                        onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                        value={userData.gender} 
                                    >
                                        <option value="Not Selected">Not Selected</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                ) : (
                                    <p className='text-text-dark font-medium'>{userData.gender}</p>
                                )}
                            </div>
                            <div>
                                <p className='text-sm font-semibold text-text-muted mb-1'>Date of Birth</p>
                                {isEdit ? (
                                    <input 
                                        className='w-full bg-background border border-border-light rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors' 
                                        type='date' 
                                        onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                        value={userData.dob} 
                                    />
                                ) : (
                                    <p className='text-text-dark font-medium'>{userData.dob}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mobile save button */}
            {isEdit && (
                <div className='mt-8 flex justify-end md:hidden'>
                    <button onClick={updateUserProfileData} className='w-full bg-primary hover:bg-primary-dark text-white font-bold px-6 py-4 rounded-xl transition-colors shadow-sm'>Save All Changes</button>
                </div>
            )}
        </div>
    ) : null
}

export default MyProfile