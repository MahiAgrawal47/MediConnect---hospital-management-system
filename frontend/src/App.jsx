import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import HealthAssistant from './pages/HealthAssistant'
import FindSpecialist from './pages/FindSpecialist'

const App = () => {
  return (
    <div className='min-h-screen bg-background text-text-dark'>
      <ToastContainer />
      <Navbar />
      <div className='mx-4 sm:mx-[10%] pt-24 pb-10'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/health-assistant' element={<HealthAssistant />} />
          <Route path='/find-specialist' element={<FindSpecialist />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App