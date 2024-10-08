import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const UpdateSong = () => {
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [image, setImage] = useState(null);
  const [song, setSong] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);
  const [data, setData] = useState([]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", selectedSongId);
      formData.append("name", name);
      formData.append("desc", desc);
      if (image) formData.append("image", image);
      if (song) formData.append("audio", song);
      formData.append("album", album);

      const response = await axios.post(`${url}/api/song/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Song Updated");
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(null);
        setSong(null);
        setSelectedSongId(null);

        await fetchSongs();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error Occurred!");
      console.log(error);
    }
    setLoading(false);
  };
  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setAlbumData(response.data.albums);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error");
    }
  };
  useEffect(() => {
    loadAlbumData();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data.success) {
        setData(response.data.songs); // Update the state with new song data
      } else {
        toast.error("Failed to fetch songs");
      }
    } catch (error) {
      toast.error("Error fetching songs");
    }
  };
  useEffect(() => {
    fetchSongs();
  }, []);
  const editSong = (item) => {
    setName(item.name);
    setDesc(item.desc);
    setAlbum(item.album);
    setSelectedSongId(item._id);
  };

  return (
    <div className="text-white">
      <p className="text-2xl semibold">All Songs</p>
      <br />
      <div>
        <div className="grid grid-cols-5 justify-center items-center gap-2.5 p-3 border border-white text-sm mr-5 bg-gray-800">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-5 justify-center items-center gap-1 p-1 border border-white bg-gray-800 text-sm mr-5"
          >
            <img className="w-12" src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.album}</p>
            <p>{item.duration}</p>
            <p className="cursor-pointer" onClick={() => editSong(item)}>
              Edit
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <h1 className="semibold text-2xl">Edit Song</h1>
        <form onSubmit={onSubmitHandler} className="flex flex-col mt-5 gap-4">
          <div className="flex flex-col gap-4">
            <p className="text-white">Upload Song</p>
            <input
              onChange={(e) => setSong(e.target.files[0])}
              type="file"
              id="song"
              accept="audio/*"
              hidden
            />
            <label htmlFor="song">
              <img
                src={song ? assets.upload_added : assets.upload_song}
                className="w-24 cursor-pointer"
              />
            </label>
          </div>
          <div className="flex flex-col gap-4">
            <p>Upload Image</p>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              accept="image/*"
              hidden
            ></input>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                className="w-24 cursor-pointer"
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              value={name}
              className="p-2 w-[max(40vw,150px)] text-black border border-gray-500"
            />
          </div>
          <div>
            <label className="flex flex-col">Description</label>
            <input
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              name="name"
              value={desc}
              className="p-2 w-[max(40vw,150px)] text-black border border-gray-500"
            />
          </div>
          <div>
            <label className="flex flex-col">Album</label>
            <select
              type="text"
              name="album"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              className="p-2 w-[max(40vw,150px)] text-black border border-gray-500"
            >
              {albumData.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit" className="bg-[#FC3C44] text-white p-2 mt-4">
              Update Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSong;
