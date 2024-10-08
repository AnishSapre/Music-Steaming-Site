import React, { useContext } from 'react';
import Sidebar from "./components/Sidebar"
import Player from './components/Player'
import Display from './components/Display';
import { PlayerContext } from './context/PlayerContext';
import Login from './components/Login';
import { Route, Routes, useLocation } from 'react-router-dom';
import Signup from './components/Signup';
const App = () => {
  const { audioRef, track,songsData} = useContext(PlayerContext);
  const location = useLocation();  // useLocation to get current route
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  return (
    <div className="h-screen bg-gray-400">
      {!isLoginPage && !isSignupPage && (
        <>
          <div className="h-[90%] flex bg-black">
            <Sidebar />
            <Display />
          </div>
          <Player />
          <audio ref={audioRef} src={track ? track.file:""} preload="auto"></audio>
        </>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
