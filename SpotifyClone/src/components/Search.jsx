import React from 'react'
import Navbar from './Navbar'
import { albumsData } from '../assets/assets'
import AlbumItem from './AlbumItem'
import { songsData } from '../assets/assets'
import SongItem from './SongItem'
import { Navigate, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets'

const Search = () => {
    
    return (
      <div className="min-h-screen px-5 pt-5 bg-white"> {/* Ensuring full-page gray background */}
            <Navbar />
            <div className='w-full h-250 flex justify-center font-semibold mb-8 bg-white'>
                <div className='flex items-center gap-4 bg-white'>
                    <img className='filter invert' src={assets.search_icon} />
                    <p className='w-[1000px] h-[50px] bg-gray-300 text-black text-[25px] px-4 pt-1.5 rounded-full hidden md:block cursor-pointer border border-black'>What do you want to play?</p>
                </div>
            </div>
            <div className='mb-4'>
              <h1 className='my-5 text-black font-bold text-2xl bg-white'>Recently Searched</h1>
              <div className='flex overflow-auto bg-white'>
                {albumsData.map((item,index) => (<AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))}
              </div>
            </div>
            
            <div className='mb-4'>
              <h1 className='my-5 text-black font-bold text-2xl bg-white'>Today's Top Hits</h1>
              <div className='flex overflow-auto bg-white'>
                {songsData.map((item,index) => (<SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))}
              </div>
            </div>
        </div>
      )
}

export default Search