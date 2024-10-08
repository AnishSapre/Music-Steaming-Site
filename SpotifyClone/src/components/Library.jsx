import React from 'react'
import Navbar from './Navbar'
import { albumsData } from '../assets/assets'
import AlbumItem from './AlbumItem'
import { songsData } from '../assets/assets'
import SongItem from './SongItem'
import { assets } from '../assets/assets'

const Library = () => {
  return (
    <div className="min-h-screen px-5 pt-5 bg-white"> {/* Ensuring full-page gray background */}
        <Navbar />
        <div className='mb-4 bg-white'>
          <h1 className='my-5 text-black text-2xl bg-white'>Your Library</h1>
          <div className='flex text-black overflow-auto bg-white'>
            {songsData.map((item,index) => (<SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />))}
          </div>
        </div>
        <div className='mb-4 flex justify-center items-center bg-white'>
        <div className='relative flex justify-center items-center w-32 h-32 bg-black rounded-full'>
          <img src={assets.plus_icon} className='w-16 h-15' alt="Add" />
        </div>
      </div>
    </div>
  )
}

export default Library