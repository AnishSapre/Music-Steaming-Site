import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Navigate, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const navigate = useNavigate();

  return (
    <div className={`h-[90%] p-2 flex flex-col gap-2 bg-white text-white lg:flex ${isCollapsed ? 'w-[5%]' : 'w-[20%]'} h-full transition-all duration-300`}>
      {/* Toggle button */}
      <button onClick={toggleSidebar} className='bg-[#FC3C44] p-2 rounded'>
        {isCollapsed ? <img className='pl-3 w-7' src={assets.arrow_right} /> 
        :
        <div className='flex items-center'>
            <img className='w-5' src={assets.arrow_left} />
            <p className='ml-5'>Collapse</p>
        </div>
        }
        
      </button>

      {/* Profile section */}
      <div className={`bg-white w-full h-[8%] rounded flex items-center p-1 gap-3 cursor-pointer ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
        <img className='w-9' src={assets.profile_icon} alt='' />
        
      </div>

      {/* Home */}
      <div onClick={() => navigate('/')} className={`bg-[#FC3C44] h-[8%] rounded flex items-center gap-3 cursor-pointer ${isCollapsed ? 'justify-center' : 'justify-start p-3'}`}>
        <img className='w-6' src={assets.home_icon} alt='' />
        {!isCollapsed && <p className=''>Home</p>}
      </div>

      {/* Search */}
      <div onClick={() => navigate('/search')} className={`bg-[#FC3C44] h-[8%] rounded flex items-center gap-3 cursor-pointer ${isCollapsed ? 'justify-center' : 'justify-start p-3'}`}>
        <img className='w-6' src={assets.search_icon} alt='' />
        {!isCollapsed && <p className=''>Search</p>}
      </div>

      {/* Library */}
      <div onClick={() => navigate('/library')} className={`bg-[#FC3C44] h-[8%] rounded flex items-center gap-3 cursor-pointer ${isCollapsed ? 'justify-center' : 'justify-start p-3'}`}>
        <img className='w-6' src={assets.stack_icon} alt='' />
        {!isCollapsed && <p className=''>Library</p>}
      </div>

      {/* Favorites */}
      <div onClick={() => navigate('/liked')} className={`bg-[#FC3C44] h-[8%] rounded flex items-center gap-3 cursor-pointer ${isCollapsed ? 'justify-center' : 'justify-start p-3'}`}>
        <img className='w-6' src={assets.like_icon} alt='' />
        {!isCollapsed && <p className=''>Favorites</p>}
      </div>

      {/* Divider */}
      <div className='w-full h-[2px] bg-black my-2'></div>
    </div>
  );
};

export default Sidebar;
