import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className='w-[100%] bg-white flex justify-between items-center font-semibold mb-6'>
        <div className='flex items-center gap-2'>
          <img 
            onClick={() => navigate(-1)} 
            className='w-8 bg-black p-2 rounded-2xl cursor-pointer' 
            src={assets.arrow_left} 
          />
          <img 
            onClick={() => navigate(1)} 
            className='w-8 bg-black p-2 rounded-2xl cursor-pointer' 
            src={assets.arrow_right} 
          />
        </div>
        <div className='flex items-center gap-4'>
          <p className='bg-[#FC3C44] text-white text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'>
            Explore Premium
          </p>
          <p onClick={() => navigate('/login')} className='bg-[#FC3C44] py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>
            Login
          </p>
        </div>
      </div>

      <div className='flex bg-white items-center gap-2 mb-8'>
        <p className='bg-white text-[#FC3C44] py-1 px-3 rounded-2xl text-[15px] cursor-pointer border border-[#FC3C44] border-5px'>All</p>    
        <p className='bg-[#FC3C44] text-white py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>Music</p>    
        <p className='bg-[#FC3C44] text-white py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>Podcasts</p>    
      </div>
    </>
  )
}

export default Navbar
