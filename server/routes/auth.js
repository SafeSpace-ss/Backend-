const express = require('express');


// cloudinary and multer config are to be here to help with hosts acoount creation

const {
    auth, 
    register,
    registerHost,
    login,
    updateDetails,
    updatePassword,
    getProfile,
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/validate');

router.post('/', auth);
router.post('/register', register );
router.post('registerHost', registerHost);
router.post('/login', login);
router.get('/profile',protect,  getProfile);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatePassword', protect, updatePassword);

module.exports = router;