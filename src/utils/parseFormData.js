const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const formidable = require('formidable').default;


const parseFormData = async(req, uploadDir) => {

    const form=formidable({})
    try {
        const[fields,files] = await form.parse(req)
    } catch (error) {
        
    }
    // return new Promise((resolve, reject) => {
    //     console.log('Upload Directory:', uploadDir);

    //     // Ensure directory exists with full permissions
    //     if (!fs.existsSync(uploadDir)) {
    //         try {
    //             fs.mkdirSync(uploadDir, { recursive: true, mode: 0o777 });
    //             console.log('Directory created successfully');
    //         } catch (mkdirError) {
    //             console.error('Error creating directory:', mkdirError);
    //             return reject(mkdirError);
    //         }
    //     }

    //     const form = formidable({
    //         keepExtensions: true,
    //         uploadDir: uploadDir,
    //     });

    //     form.parse(req, (err, fields, files) => {
    //         if (err) {
    //             console.error('Form parse error:', err);
    //             return reject(err);
    //         }

    //         if (!files.image || files.image.length === 0) {
    //             console.error('No image uploaded');
    //             return reject(new Error('No image uploaded'));
    //         }

    //         const image = files.image[0];
    //         console.log('Original Image Path:', image.filepath);

    //         const uniqueFilename = `${uuidv4()}${path.extname(image.originalFilename)}`;
    //         const newPath = path.join(uploadDir, uniqueFilename);
            
    //         console.log('New Image Path:', newPath);

    //         try {
    //             // Ensure the destination directory exists
    //             const destinationDir = path.dirname(newPath);
    //             if (!fs.existsSync(destinationDir)) {
    //                 fs.mkdirSync(destinationDir, { recursive: true, mode: 0o777 });
    //             }

    //             // Copy instead of rename to avoid moving across devices
    //             fs.copyFileSync(image.filepath, newPath);
                
    //             // Optional: Remove the temporary file
    //             fs.unlinkSync(image.filepath);

    //             console.log('Image saved successfully');

    //             resolve({
    //                 imageUrl: `/uploads/designs/${uniqueFilename}`,
    //                 fields,
    //                 image,
    //             });
    //         } catch (saveError) {
    //             console.error('Error saving image:', saveError);
    //             reject(saveError);
    //         }
    //     });
    // });
};

module.exports = parseFormData;
