const { get_user_design, add_user_template, get_user_designs, add_user_image, get_templates, create_template, update_template, delete_template } = require('../controllers/designController');
const authMiddleware = require('../middlewares/middleware');
const router = require('express').Router();
const upload = require('../utils/fileUploadUtil');







// Middleware
router.post('/create-user-design',authMiddleware,upload.single('image'), create_template);
router.get('/user-design/:design_id', authMiddleware, get_user_design)
router.put('/update-user-design/:design_id', authMiddleware,upload.single('image'),update_template)
// router.delete('/delete-user-image/:design_id', authMiddleware, delete_template)

router.post('/add-user-image', authMiddleware,upload.single('image'), add_user_image)
// router.get('/get-user-image', auth, designController.get_user_image)

// router.get('/design-images', auth, designController.get_initial_image)
// router.get('/background-images', auth, designController.get_background_image)

// router.get('/user-designs', authMiddleware, get_user_designs)



router.get('/templates', authMiddleware, get_templates)
router.get('/add-user-template/:template_id', authMiddleware, add_user_template)

module.exports = router;