import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from 'react-toastify';
const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);

      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`, { id });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSongs();
      }
    } catch (error) {
      toast.error("Error occured");
    }
  };
  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="text-white">
      <p>All Songs</p>
      <br />
      <div>
        <div className="grid grid-cols-5 justify-center items-center gap-2.5 p-3 border border-white text-sm mr-5 bg-gray-800">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-5 justify-center items_center gap-1 p-1 border border-white bg-gray-800 text-sm mr-5"
            >
              <img className="w-12" src={item.image} />
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <p className='cursor-pointer' onClick={() => removeSong(item._id)}>Remove</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListSong;
