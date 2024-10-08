import React from 'react'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes,Route} from 'react-router-dom';
import AddAlbum from './pages/AddAlbum';
import AddSong from './pages/AddSong';
import ListSong from './pages/ListSong';
import ListAlbum from './pages/ListAlbum';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from '../../SpotifyClone/src/components/Login';
import ListUser from './pages/ListUser';
import UpdateAlbum from './pages/UpdateAlbum';
import UpdateSong from './pages/UpdateSong';

export const url = 'http://localhost:4000'

const App = () => {
  return (
    <div className='flex items-start min-h-screen bg-black'>
      <ToastContainer/>
      <Sidebar />
      <div className='flex-1 h-screen overflow-y-scroll bg-black'>
        <Navbar />
        <div className='pt-8 pl-5 sm:pt-12 sm:pl-12'>
          <Routes>
            <Route path='/add-song' element={<AddSong />} />
            <Route path='/add-album' element={<AddAlbum />} />
            <Route path='/list-album' element={<ListAlbum />} />
            <Route path='/list-song' element={<ListSong />} />
            <Route path='/list-user' element={<ListUser />} />
            <Route path='/update-album' element={<UpdateAlbum />} />
            <Route path='/update-song' element={<UpdateSong />} />
          </Routes>
        </div>

      </div>

    </div>
  )
}

export default App