import React, { useContext, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import Search from "./Search";
import Login from "./Login";
import Signup from "./Signup";
import Library from "./Library";
import Liked from "./Liked";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";

  const { albumsData, songsData } = useContext(PlayerContext);
  if (!albumsData) return null; // Prevent rendering before albumsData is ready

  // Find the album using albumId
  const album = albumsData.find((a) => a.id === albumId);

  // Set background color based on album or default
  const bgColor = isAlbum && album ? album.bgColour : "#121212";

  useEffect(() => {
    if (isAlbum && album) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #000000)`;
    } else {
      displayRef.current.style.background = "#000000";
    }
  }, [isAlbum, album, bgColor]);

  return (
    <div
      ref={displayRef}
      className="w-[100%] px-1 bg-gray-400 text-white overflow-auto lg:w-[100%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum album={album} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/library" element={<Library />} />
        <Route path="/liked" element={<Liked />} />
      </Routes>
    </div>
  );
};

export default Display;
