const asyncHandler = require('../middleware/async');
const errorResponse = require('../utils/errorResponse');
const User = require('../models/user');
const Host = require('../models/host');
const ErrorResponse = require('../utils/errorResponse');

//@desc         Get all Users
//@route        GET /api/v1/users
//@access       Private (Admin)
exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResult)
});

// @desc      Get all Hosts
// @route     GET /api/v1/hosts
// @access    Private (Admin)
exports.getHosts = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResult);
});

// @desc      Get a User or Hosts
// @route     GET /api/v1/users/:id
// @access    Private (Admin)
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = 
    (await User.findById(req.params.id))   ||   (await Host.findById(req.params.id));

    if (!user) {
        return next(
            new errorResponse(`User not found with id of ${req.params.id}`, 400)
        )
    }

    res.status(200).json({
        success: true,
        message: 'User retrieved',
        data: user,
    });
});

// @desc      Delete User or Host
// @route     Delete /api/v1/user/:id
// @access    Private (Admin)
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = 
        (await User.findById(req.params.id))   ||   (await Host.findById(req.params.id));

    if (!user) {
        return next(
            new errorResponse(`User not found with id of ${req.params.id}`, 402)
        );
    }

    if (user.id === req.user.id) {
        return next(new errorResponse(`Cannot delete your account`, 403));
    }

    user.remove();

    res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: {},
    });
});
