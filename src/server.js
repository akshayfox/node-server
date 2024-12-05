const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const uploadRoutes = require('./routes/upload');
const designRoutes = require('./routes/designRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// const fs = require('fs');
// if (!fs.existsSync('uploads')) {
//   fs.mkdirSync('uploads');
// }




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', uploadRoutes);
app.use('/api/designs', designRoutes);
app.use('/uploads', express.static('uploads'));






app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!',
    details: err.message
  });
});


module.exports = app;