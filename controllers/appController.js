import AppModel from '../models/appModel.js';
import cloudinary from '../config/cloudinaryConfig.js';

export const createAppEntry = async (req, res) => {
    try {
        const {bio} = req.body;
        const imageFile = req.file;
        if (!bio) {
          return res.json({ success: false, message: "Missing Details" });
        }
    
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image",
        });
        const imageUrl = imageUpload.secure_url;
    
        const appData = {
          bio,
          image: imageUrl,
        };
        const newData = new AppModel(appData);
        await newData.save();
    
        return res.json({ success: true, message: "Doctor Added" });
      } catch (error) {
        res.status(500).json({success:false,message:error.message})
    
      }
};
export const getAppEntry = async (req, res) => {
    try {
        const entries = await AppModel.find()
        if (entries.length === 0) {
            return res.status(404).json({ success: false, message: "No entries found" });
        }
        return res.status(200).json({ success: true,  entries });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const getImages = async (req, res) => {
    try {
        const images = await AppModel.find().select("-bio");
        if (images.length === 0) {
            return res.status(404).json({ success: false, message: "No entries found" });
        }

        return res.status(200).json({ success: true, images }); // Change 'data' to 'images'
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getCard = async (req, res) => {
  try {
    const entry = await AppModel.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ success: false, message: "Entry not found" });
    }

    res.status(200).json({ success: true, entry });
  } catch (error) {
    console.error("Error fetching entry:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};


export const deleteEntry = async (req, res) => {
  try {
    const entry = await AppModel.findByIdAndDelete(req.params.id);

    if (!entry) {
      return res.status(404).json({ success: false, message: "Entry not found" });
    }

    res.status(200).json({ success: true, message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};
