const express = require('express');
const {
    getUsers,
    getHosts,
    getUser,
    deleteUser, 
} = require('../controllers/users'); 

const advancedResults = require('../middleware/advancedResult');
const User = require('../models/user');
const Host = require('../models/host');

const router = express.Router();

const{ protect, authorize } = require('../middleware/validate');

router.use(protect);
router.use(authorize('admin'));

router.get('/user', advancedResults(User), getUsers);
router.get('/hosts', advancedResults(Host), getHosts);

router.route('/:id').get(getUser).delete(deleteUser);

module.exports = router;