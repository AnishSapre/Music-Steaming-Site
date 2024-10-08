import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar w-full border-b-2 border-white px-2 sm:px-12 py-4 text-lg'>
        <p className='text-white'>
            Admin Panel
        </p>
    </div>
  )
}

export default Navbar
