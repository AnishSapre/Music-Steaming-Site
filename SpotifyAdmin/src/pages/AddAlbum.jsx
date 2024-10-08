import React, { useState } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { url } from '../App'
import { toast } from 'react-toastify';

const AddAlbum = () => {
  const [image, setImage] = useState(null); // Initialize with null
  const [colour, setColour] = useState("#ffffff");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append('bgColor', colour);

      const response = await axios.post(`${url}/api/album/add`, formData);
      if (response.data.success) {
        toast.success("Song Added");
        setName("");
        setDesc("");
        setColour("#ffffff");
        setImage(null);
      } else {
        toast.error("Something went wrong");
      }
    }catch (error) {
        console.log(error);
        toast.error("Error Occured!");
      }
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-white border-t-[#Fc3C44] rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-white"
    >
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            className="w-24 cursor-pointer"
            alt="Upload"
          />
        </label>
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Type Here..."
          className="bg-white outline-red border-2 border-gray p-2.5 w-[max(40vw,150px)] text-black"
          required
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album Description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          type="text"
          placeholder="Type Here..."
          className="bg-white outline-red border-2 border-gray p-2.5 w-[max(40vw,150px)] text-black"
          required
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
      <button
        type="submit"
        className="text-base bg-[#FC3C44] text-white px-14 py-2.5 cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;
