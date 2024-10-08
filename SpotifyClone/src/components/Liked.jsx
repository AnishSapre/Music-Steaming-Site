import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const Liked = () => {
    const {id} = useParams();
    const albumData = albumsData[1]
    const {playWithId} = useContext(PlayerContext)
  return (
    <div className="min-h-screen px-5 pt-5 bg-white"> {/* Ensuring full-page gray background */}

        <Navbar />
        <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
            <img className='w-48 rounded f invert' src={assets.like_icon} />
            <div className='flex flex-col'>
                    <h2 className='text-5xl font-bold text-black mb-12 md:text-7xl'>Favorites</h2>
                <p className='mt-1'>
                </p>
            </div>
        </div>
        <div className='grid grid-cols-4 font-semibold sm:grid-cols-5 mt-10 mb-4 pl-2 text-black'>
            <p><b className='mr-4'>#</b>Title</p>
            <p>Album</p>
            <p className='hiddeen sm:block'>Date Added</p>
            <p className='hiddeen sm:block'>Liked</p>
            <img className='m-auto w-4 filter invert' src={assets.clock_icon} />
        </div>
        <hr className='h-[2px] bg-black' />
        {
            songsData.map((item,index) =>(
                <div onClick={() => playWithId(item.id)} key={index} className='grid grid-cols-4 sm:grid-cols-5 gap-2 p-2 text-black hover:bg-gray-700 cursor-pointer justify-center'>
                    <p className='text-black'>
                        <b className='mr-4 text-black'>{index+1}</b>
                        <img className='inline w-10 mr-5' src={item.image} />
                        {item.name}
                    </p>
                    <p className='text-[15px]'>
                        {albumData.name}
                    </p>
                    <p className='text-[15px] hidden sm:block'>
                        5 days ago
                    </p>
                    <img className='w-5 h-5 filter invert' src={assets.like_icon} />
                    <p className='text-[15px] text-center'>
                        {item.duration}
                    </p>
                </div>
            ))
        }
        
        

    </div>
  )
}

export default Liked