import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const Player = () => {

  const {track,seekBar,seekBg,playStatus,play,pause,time,previous,next,seekSong} = useContext(PlayerContext)

  return track ? (
    <div className='h-[10%] bg-white  flex justify-between border-t-2 border-black items-center text-white px-4'>
        <div className='hidden lg:flex items-center gap-3'>
            <img className='w-14 rounded-full border border-black' src={track.image} />
            <div className='text-black'>
                <p>{track.name}</p>
                <p>{track.desc.slice(0,12)}</p>
            </div>
        </div>
        <div className='mt-5 absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1'>          <div className='flex gap-4'>
            <img className='w-4 cursor-pointer filter invert' src={assets.shuffle_icon} />
            <img onClick={previous} className='w-4 cursor-pointer filter invert' src={assets.prev_icon} />
            {playStatus
            ?<img onClick={pause} className='w-4 cursor-pointer filter invert' src={assets.pause_icon} />:
            <img onClick={play} className='w-4 cursor-pointer filter invert' src={assets.play_icon} />
            }
            <img onClick={next} className='w-4 cursor-pointer filter invert' src={assets.next_icon} />
            <img className='w-4 cursor-pointer filter invert' src={assets.loop_icon} />
          </div>
          <div className='flex items-center gap-2'>
            <p className='text-gray-700 text-[12px]'>{time.currentTime.minute}:{time.currentTime.second}</p>
            <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-500 rounded-full cursor-pointer'>
              <hr ref={seekBar} className='h-1 border-none w-full bg-[#FC3C44] rounded full' />
            </div>
            <p className='text-gray-700 text-[12px]'>{time.totalTime.minute}:{time.totalTime.second}</p>
          </div>
        </div>
        <div className='mt-10 hidden lg:flex items-center gap-3 opacity-75'>
          <img className='w-4 filter invert' src={assets.plays_icon} />
          <img className='w-4 filter invert'src={assets.mic_icon} />
          <img className='w-4 filter invert' src={assets.queue_icon} />
          <img className='w-4 filter invert' src={assets.speaker_icon} />
          <img className='w-4 filter invert' src={assets.volume_icon} />
          <div className='w-20 filter invert bg-slate-50 h-1 rounded' />
          <img className='w-4 filter invert' src={assets.mini_player_icon} />
          <img className='w-4 filter invert' src={assets.zoom_icon} />

        </div>
    </div>
  ) : null
}

export default Player