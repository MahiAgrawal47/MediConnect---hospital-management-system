import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border-light shadow-sm py-4 px-4 sm:px-[10%] flex items-center justify-between'>
      {/* Logo */}
      <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer'>
        <img className='w-8 h-8' src={assets.mediconnect_icon} alt="MediConnect" />
        <span className='text-xl font-bold text-primary tracking-tight'>Medi<span className='text-text-dark'>Connect</span></span>
      </div>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex items-center gap-8 font-medium text-sm text-text-muted'>
        <NavLink to='/' className={({isActive}) => isActive ? "text-primary font-semibold" : "hover:text-primary transition-colors"}>
          Home
        </NavLink>
        <NavLink to='/doctors' className={({isActive}) => isActive ? "text-primary font-semibold" : "hover:text-primary transition-colors"}>
          Find Doctors
        </NavLink>
        <NavLink to='/health-assistant' className={({isActive}) => isActive ? "text-primary font-semibold" : "hover:text-primary transition-colors"}>
          AI Assistant
        </NavLink>
        <NavLink to='/about' className={({isActive}) => isActive ? "text-primary font-semibold" : "hover:text-primary transition-colors"}>
          About
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className='flex items-center gap-4'>
        {
          token && userData
            ? <div className='flex items-center gap-3 relative'>
                <div onClick={() => setShowProfileMenu(!showProfileMenu)} className='flex items-center gap-2 cursor-pointer relative z-20'>
                  <img className='w-9 h-9 rounded-full object-cover border-2 border-primary-light' src={userData.image} alt="" />
                  <span className='hidden lg:block text-sm font-medium text-text-dark'>{userData.name.split(' ')[0]}</span>
                  <img className={`w-2.5 opacity-70 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} src={assets.dropdown_icon} alt="" />
                </div>
                
                {/* Invisible overlay to catch clicks outside */}
                {showProfileMenu && (
                  <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)}></div>
                )}

                <div className={`absolute top-full right-0 mt-2 min-w-48 bg-white border border-border-light rounded-xl shadow-card flex-col overflow-hidden z-20 ${showProfileMenu ? 'flex' : 'hidden'}`}>
                  <p onClick={() => {navigate('/my-profile'); setShowProfileMenu(false)}} className='px-4 py-3 text-sm hover:bg-background text-text-dark cursor-pointer transition-colors'>My Profile</p>
                  <p onClick={() => {navigate('/my-appointments'); setShowProfileMenu(false)}} className='px-4 py-3 text-sm hover:bg-background text-text-dark cursor-pointer transition-colors'>My Appointments</p>
                  <div className='h-px bg-border-light'></div>
                  <p onClick={() => {logout(); setShowProfileMenu(false)}} className='px-4 py-3 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors'>Logout</p>
                </div>
              </div>
            : <button onClick={() => navigate('/login')} className='bg-primary hover:bg-primary-dark transition-colors text-white px-6 py-2 rounded-lg font-medium hidden md:block shadow-sm'>Login</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="Menu" />
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 z-50 bg-white transition-transform duration-300 ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex items-center justify-between px-5 py-5 border-b border-border-light'>
          <div className='flex items-center gap-2'>
            <img className='w-8 h-8' src={assets.mediconnect_icon} alt="MediConnect" />
            <span className='text-xl font-bold text-primary tracking-tight'>Medi<span className='text-text-dark'>Connect</span></span>
          </div>
          <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 cursor-pointer' alt="Close" />
        </div>
        <ul className='flex flex-col p-6 gap-6 text-lg font-medium text-text-muted'>
          <NavLink onClick={() => setShowMenu(false)} to='/' className={({isActive}) => isActive ? "text-primary" : "hover:text-primary"}>Home</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/doctors' className={({isActive}) => isActive ? "text-primary" : "hover:text-primary"}>Find Doctors</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/health-assistant' className={({isActive}) => isActive ? "text-primary" : "hover:text-primary"}>AI Assistant</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/about' className={({isActive}) => isActive ? "text-primary" : "hover:text-primary"}>About</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/contact' className={({isActive}) => isActive ? "text-primary" : "hover:text-primary"}>Contact</NavLink>
          {!token && (
            <button onClick={() => { setShowMenu(false); navigate('/login'); }} className='mt-4 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium text-center shadow-sm w-full'>Login / Sign Up</button>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar