import React from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumItem = ({image, name, desc, id}) => {
  const navigate = useNavigate()

  return (
  <div 
      onClick={() => navigate(`/album/${id}`)} 
      className='flex items-center w-80 h-20 p-3 mb-4 mr-3 rounded cursor-pointer bg-gray-400 hover:bg-gray-500'
    >      <img className='w-12 h-12 rounded object-cover ml-1 mr-2' src={image} alt={`${name} cover`}/>
      <div className='flex flex-col'>
        <p className='font-bold text-sm text-white truncate'>{name}</p>
        <p className='text-slate-200 text-xs truncate'></p>
      </div>
    </div>
  )
}

export default AlbumItem
