import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const UpdateAlbum = () => {
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [colour, setColour] = useState("#ffffff");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);
  const [data, setData] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", selectedAlbumId);
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("bgColor", colour);
      if (image) formData.append("image", image);

      const response = await axios.post(`${url}/api/album/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Album Updated");
        setName("");
        setDesc("");
        setImage(null);
        setColour("#ffffff");
        setSelectedAlbumId(null);

        await fetchAlbums();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error Occurred!");
      console.log(error);
    }
    setLoading(false);
  };
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
  useEffect(() => {
    fetchAlbums();
  }, []);

  const editAlbum = (item) => {
    setName(item.name);
    setDesc(item.desc);
    setSelectedAlbumId(item._id);
  };

  return (
    <div className="text-white">
      <p className="text-2xl semibold">All Albums</p>
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
            <p className="cursor-pointer" onClick={() => editAlbum(item)}>
              Edit
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <h1 className="semibold text-2xl">Edit Album</h1>
        <form onSubmit={onSubmitHandler} className="flex flex-col mt-5 gap-4">
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
            <label className="flex flex-col">Album Name</label>
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
          <div className="flex flex-col gap-3">
            <p>Background Colour</p>
            <input
              onChange={(e) => setColour(e.target.value)}
              value={colour}
              type="color"
            />
          </div>
          <div>
            <button type="submit" className="bg-[#FC3C44] text-white p-2 mt-4">
              Update Album
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAlbum;
