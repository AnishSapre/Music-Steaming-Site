import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from 'react-toastify';

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);

      if (response.data.success) {
        setData(response.data.albums);
      }
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums();
      }
    } catch (error) {
      toast.error("Error occured");
    }
  };
  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="text-white">
      <p>All Albums</p>
      <br />
      <div>
        <div className="grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-white text-sm mr-5 bg-gray-800">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items_center gap-1 p-1 border border-white bg-gray-800 text-sm mr-5"
            >
              <img className="w-12" src={item.image} />
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <p className='cursor-pointer' onClick={() => removeAlbum(item._id)}>Remove</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListAlbum;
