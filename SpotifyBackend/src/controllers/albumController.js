import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";

const addAlbum = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const bgColor = req.body.bgColor;
    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const albumData = {
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    };

    const album = albumModel(albumData);
    await album.save();

    res.json({ success: true, message: "Successfully added" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

const listAlbum = async (req, res) => {
  try {
    const allAlbums = await albumModel.find({});
    res.json({ success: true, albums: allAlbums });
  } catch (error) {
    res.json({ success: false });
  }
};

const removeAlbum = async (req, res) => {
  try {
    await albumModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Album Removed" });
  } catch (error) {
    res.json({ success: false });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const { id, name, desc, bgColor } = req.body;
    let updateData = { name, desc, bgColor };

    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    const updatedAlbum = await albumModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedAlbum) {
      return res
        .status(404)
        .json({ success: false, message: "Album not found" });
    }

    res.json({
      success: true,
      message: "Album updated successfully",
      album: updatedAlbum,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating album" });
  }
};

export { addAlbum, listAlbum, removeAlbum, updateAlbum };
