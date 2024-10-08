import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const imageFile = req.files.image[0];
    const audioFile = req.files.audio[0];

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };

    const song = new songModel(songData);
    await song.save();

    res.json({ success: true, message: "Successfully added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};

const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});
    res.json({ success: true, songs: allSongs });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
};

const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song Removed" });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
};

const updateSong = async (req, res) => {
    try {
      const { name, desc, album } = req.body;
      let imageUpload, audioUpload;
  
      // Only upload new files if provided
      if (req.files.image) {
        const imageFile = req.files.image[0];
        imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image",
        });
      }
  
      if (req.files.audio) {
        const audioFile = req.files.audio[0];
        audioUpload = await cloudinary.uploader.upload(audioFile.path, {
          resource_type: "video",
        });
      }
  
      const duration = audioUpload
        ? `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`
        : null;
  
      const updateData = {
        name,
        desc,
        album,
      };
  
      if (imageUpload) {
        updateData.image = imageUpload.secure_url;
      }
      if (audioUpload) {
        updateData.file = audioUpload.secure_url;
        updateData.duration = duration;
      }
  
      await songModel.findByIdAndUpdate(req.body.id, updateData, { new: true });
  
      res.json({ success: true, message: "Song updated successfully" });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error updating song" });
    }
  };

export { addSong, listSong, removeSong, updateSong };
