import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='border-t border-border-light pt-16 pb-8 px-4 sm:px-6 bg-white mt-10'>
      <div className='flex flex-col md:flex-row justify-between gap-12 mb-12 max-w-7xl mx-auto'>
        <div className='md:w-1/3'>
          <div className='flex items-center gap-2 mb-6'>
            <img className='w-8 h-8' src={assets.mediconnect_icon} alt="MediConnect" />
            <span className='text-2xl font-bold text-primary tracking-tight'>Medi<span className='text-text-dark'>Connect</span></span>
          </div>
          <p className='text-text-muted leading-relaxed mb-6'>
            MediConnect is your trusted partner in managing healthcare efficiently. We bridge the gap between patients and medical professionals, bringing expert care directly to you.
          </p>
          <div className='flex gap-4'>
            {/* Social Icons Placeholder */}
            <div className='w-10 h-10 rounded-full bg-background flex items-center justify-center cursor-pointer hover:bg-primary-light transition-colors text-text-dark font-bold'>in</div>
            <div className='w-10 h-10 rounded-full bg-background flex items-center justify-center cursor-pointer hover:bg-primary-light transition-colors text-text-dark font-bold'>x</div>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-12 md:w-2/3 md:justify-end'>
          <div>
            <h4 className='text-text-dark font-bold mb-6 tracking-wide'>PLATFORM</h4>
            <ul className='flex flex-col gap-4 text-text-muted'>
              <li className='hover:text-primary cursor-pointer transition-colors'>Home</li>
              <li className='hover:text-primary cursor-pointer transition-colors'>Find Doctors</li>
              <li className='hover:text-primary cursor-pointer transition-colors'>AI Assistant</li>
              <li className='hover:text-primary cursor-pointer transition-colors'>About Us</li>
            </ul>
          </div>

          <div>
            <h4 className='text-text-dark font-bold mb-6 tracking-wide'>LEGAL</h4>
            <ul className='flex flex-col gap-4 text-text-muted'>
              <li className='hover:text-primary cursor-pointer transition-colors'>Terms of Service</li>
              <li className='hover:text-primary cursor-pointer transition-colors'>Privacy Policy</li>
              <li className='hover:text-primary cursor-pointer transition-colors'>Data Security</li>
            </ul>
          </div>

          <div>
            <h4 className='text-text-dark font-bold mb-6 tracking-wide'>CONTACT</h4>
            <ul className='flex flex-col gap-4 text-text-muted'>
              <li className='flex items-center gap-2'><span className='text-xl'>📞</span> +1-212-456-7890</li>
              <li className='flex items-center gap-2'><span className='text-xl'>✉️</span> contact@mediconnect.com</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='border-t border-border-light pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-text-muted max-w-7xl mx-auto'>
        <p>&copy; {new Date().getFullYear()} MediConnect Healthcare. All rights reserved.</p>
        <p>Your Healthcare, Connected.</p>
      </div>
    </footer>
  )
}

export default Footer
