# Express File Upload Server

A simple Express.js server with MongoDB integration and file upload functionality.

## Features

- Express.js REST API
- MongoDB database integration
- File upload using Multer
- CORS enabled
- Basic error handling

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make sure MongoDB is running locally
4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/upload` - Upload a file
- `GET /api/files` - Get list of uploaded files
- `GET /` - Welcome message

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp
```