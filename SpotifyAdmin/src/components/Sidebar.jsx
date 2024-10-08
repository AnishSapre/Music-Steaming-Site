import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);


  const navigate = useNavigate();

  return (
    <div className={`p-2 flex flex-col gap-2 text-white lg:flex w-[20%] h-[70%] transition-all duration-300`}>
   
      {/* Profile section */}
      <div className={`bg-black w-full h-[10%] rounded flex items-center p-1 gap-3 cursor-pointer ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
        <img className='w-9' src={assets.profile_icon} alt='' />
        
      </div>

      {/* Home */}
      <NavLink to='/add-song' className={`bg-[#FC3C44] h-[10%] rounded flex items-center gap-3 cursor-pointer ${isCollapsed ? 'justify-center' : 'justify-start p-3'}`}>
        <img className='w-6' src={assets.add_song} alt='' />
        {!isCollapsed && <p className=''>Add Song</p>}
      </NavLink>

      {/* Search */}
      <NavLink to='/list-song' className={`bg-[#FC3C44] h-[10%] rounded flex items-center gap-3 cursor-pointer ${isCollapsed ? 'justify-center' : 'justify-start p-3'}`}>
        <img className='w-6' src={assets.song_icon} alt='' />
        {!isCollapsed && <p className=''>List Song</p>}
      </NavLink>

      {/* Update Song */}
      <NavLink to='/update-song' className={`bg-[#FC3C44] h-[10%] rounded flex items-center gap-3 cursor-pointer ${isCollapsed ? 'justify-center' : 'justify-start p-3'}`}>
        <img className='w-6' src={assets.profile} alt='' />
        {!isCollapsed && <p className=''>Update Song</p>}
      </NavLink>

      {/* Library */}
      <NavLink to='/add-album' className={`bg-[#FC3C44] h-[10%] rounded flex items-center gap-3 cursor-pointer ${isCollapsed ? 'justify-center' : 'justify-start p-3'}`}>
        <img className='w-6' src={assets.add_album} alt='' />
        {!isCollapsed && <p className=''>Add Album</p>}
      </NavLink>

      {/* Favorites */}
      <NavLink to='/list-album' className={`bg-[#FC3C44] h-[10%] rounded flex items-center gap-3 cursor-pointer ${isCollapsed ? 'justify-center' : 'justify-start p-3'}`}>
        <img className='w-6' src={assets.album_icon} alt='' />
        {!isCollapsed && <p className=''>List Albums</p>}
      </NavLink>

      {/* List User */}
      <NavLink to='/list-user' className={`bg-[#FC3C44] h-[10%] rounded flex items-center gap-3 cursor-pointer ${isCollapsed ? 'justify-center' : 'justify-start p-3'}`}>
        <img className='w-6' src={assets.profile} alt='' />
        {!isCollapsed && <p className=''>List User</p>}
      </NavLink>

      

      {/* Update Album */}
      <NavLink to='/update-album' className={`bg-[#FC3C44] h-[10%] rounded flex items-center gap-3 cursor-pointer ${isCollapsed ? 'justify-center' : 'justify-start p-3'}`}>
        <img className='w-6' src={assets.profile} alt='' />
        {!isCollapsed && <p className=''>Update Album</p>}
      </NavLink>

      {/* Divider */}
      <div className='w-full h-[1px] bg-white my-2'></div>
    </div>
  );
};

export default Sidebar;
