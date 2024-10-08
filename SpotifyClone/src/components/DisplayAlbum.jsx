import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();  // Extracts the album ID from the URL
  const [albumData, setAlbumData] = useState(null);  // Initializes albumData as null
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);  // Fetch context data

  // Debugging: Check what the id and albumsData are
  console.log("Album ID from URL:", id);
  console.log("Albums Data:", albumsData);

  useEffect(() => {
    // Find the album with the matching ID in albumsData
    const album = albumsData.find((item) => item._id === id);

    if (album) {
      setAlbumData(album);  // If album is found, set albumData
    } else {
      console.error("Album not found!");  // If not found, log an error
    }
  }, [id, albumsData]);

  // Debugging: Check if albumData is being set correctly
  console.log("Album Data:", albumData);

  // If albumData is still null, show a loading message or error message
  if (!albumData) return <div>Loading or Album not found...</div>;

  return (
    <div className="min-h-screen px-5 pt-5 bg-white"> {/* Ensuring full-page gray background */}
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end bg-white">
        <img className="w-48 rounded" src={albumData.image} alt={albumData.name} />
        <div className="flex flex-col bg-white">
          <p className="text-black">Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl bg-white text-black">
            {albumData.name}
          </h2>
          <h4 className="text-black">{albumData.desc}</h4>
          <p className="mt-1">
            <img className="inline-block w-5 mr-1" src={assets.spotify_logo} alt="Spotify logo" />
            <b className="text-black"> Spotify</b>
          </p>
        </div>
      </div>

      {/* Songs table */}
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-black bg-white">
        <p>
          <b className="mr-4 ">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4 filter invert" src={assets.clock_icon} alt="Clock icon" />
      </div>
      <hr className="bg-black h-1" />

      {/* Songs from the album */}
      {songsData
        .filter((item) => item.album === albumData.name)
        .map((item, index) => (
          <div
            onClick={() => playWithId(item.id)}
            key={index}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 text-black hover:bg-gray-700 cursor-pointer"
          >
            <p className="text-black">
              <b className="mr-4 text-black">{index + 1}</b>
              <img className="inline w-10 mr-5" src={item.image} alt={item.name} />
              {item.name}
            </p>
            <p className="text-[15px]">{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>
          </div>
        ))}
    </div>
  );
};

export default DisplayAlbum;
