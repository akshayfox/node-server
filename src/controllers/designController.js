const DesignModel = require("../models/DesignModel");
const {
  mongo: { ObjectId },
} = require("mongoose");
const path = require("path");
const fs = require("fs");
const UserImageModel = require("../models/UserImageModel");
const TemplateModel = require("../models/TemplateModel");

const serveStaticFiles = (req, res, next) => {
  const publicPath = path.join(process.cwd(), "public");
  express.static(publicPath)(req, res, next);
};

const create_user_design = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }
    if (!req.body.design) {
      return res
        .status(400)
        .json({ message: "Design components are required" });
    }
    let designComponents;
    try {
      designComponents = JSON.parse(req.body.design);
    } catch (error) {
      return res.status(400).json({
        message: "Invalid design components format",
        error: error.message,
      });
    }
    const design = await TemplateModel.create({
      components: designComponents,
      image_url: req.file.path,
    });
    return res.status(201).json({
      message: "Template created successfully",
      data: design._id,
    });
  } catch (error) {
    console.error("Design creation error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const update_user_design = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }
    if (!req.body.design) {
      return res
        .status(400)
        .json({ message: "Design components are required" });
    }
    let designComponents;
    try {
      designComponents = JSON.parse(req.body.design).design;
      console.log(designComponents, "designComponents");
    } catch (error) {
      return res.status(400).json({
        message: "Invalid design components format",
        error: error.message,
      });
    }
    const { design_id } = req.params;
    const old_design = await DesignModel.findById(design_id);
    if (!old_design) {
      return res.status(404).json({ message: "Design not found" });
    }
    if (old_design.image_url) {
      const oldImagePath = path.join(
        process.cwd(),
        "public",
        old_design.image_url
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    await DesignModel.findByIdAndUpdate(
      design_id,
      {
        image_url: req.file.path,
        components: designComponents,
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Design updated successfully",
      data: design_id,
    });
  } catch (error) {
    console.error("Design update error:", error);
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error("File cleanup error:", cleanupError);
      }
    }
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const get_user_design = async (req, res) => {
  const { design_id } = req.params;
  try {
    const design = await DesignModel.findById(design_id);
    return res.status(200).json({ data: design.components });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const add_user_image = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }
  if (!req.body.image) {
    return res.status(400).json({ message: "Image is required" });
  }
  const userImage = await UserImageModel.create({
    user_id: req.user.userId,
    image_url: req.file.path,
  });
  return res.status(201).json({ data: userImage._id });

};

const get_user_image = async (req, res) => {
  const { _id } = req.userInfo;
  try {
    const images = await userImageModel.find({ user_id: new ObjectId(_id) });
    return res.status(200).json({ images });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const get_initial_image = async (req, res) => {
  try {
    const images = await DesignModel.find({});
    return res.status(200).json({ images });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

get_background_image = async (req, res) => {
  try {
    const images = await backgroundImageModel.find({});
    return res.status(200).json({ images });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const get_user_designs = async (req, res) => {
  const { userId } = req.user;
  try {
    const designs = await DesignModel.find({
      user_id: new ObjectId(userId),
    }).sort({ createdAt: -1 }).select('-components');
    return res.status(200).json({ designs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const delete_user_image = async (req, res) => {
  const { design_id } = req.params;
  try {
    await DesignModel.findByIdAndDelete(design_id);
    return res.status(200).json({ message: "design delete success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const get_templates = async (req, res) => {
  try {
    const templates = await TemplateModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ templates });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const add_user_template = async (req, res) => {
  const { template_id } = req.params;
  const { userId } = req.user;
  try {
    const template = await TemplateModel.findById(template_id);
    const design = await DesignModel.create({
      user_id: userId,
      components: template.components,
      image_url: template.image_url,
    });
    return res.status(200).json({ design });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  serveStaticFiles,
  create_user_design,
  get_user_design,
  update_user_design,
  add_user_template,
  get_user_designs,
  delete_user_image,
  add_user_image,
  get_templates
};
