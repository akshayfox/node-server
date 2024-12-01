const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const File = require('../models/File');

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    await file.save();
    res.status(201).json({
      message: 'File uploaded successfully',
      file: file
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error uploading file',
      details: error.message
    });
  }
});

router.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({
      error: 'Error retrieving files',
      details: error.message
    });
  }
});

module.exports = router;