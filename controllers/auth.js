// Add {cloudinary}, {dataUri}, {transporter} later on in the project
const { dataUri } = require('../utils/multer')
const errorResponse = require('../utils/errorResponse');
const sendTokenResponse = require('../utils/sendTokenResponse');

const asyncHandler = require('../middleware/async');
const { cloudinary } = require('../middleware/cloudinary')

const User = require('../models/user');
const Host = require('../models/host');


// @desc      Auth Details
// @route     POST /api/v1/auth/
// @access    Public
exports.auth = asyncHandler(async (req, res) => {
    //I added username, check the video to ensure this logic mathes the flow.
    const {email, username, phone, busness_name} = req.body;
    const existingEmail = (await User.findOne({ email })) || (await Host.findOne({ email }));
    const existingUsername = await User.findOne({ username });
    const existingPhone = (await User.findOne({ phone })) || (await Host.findOne({ phone }));
    const existingBusiness_name = await Host.findOne({ business_name });
    const error_response = (key) => res.status(200).send({
        message: `${key === 'business_name' ? 'Business Name' : key} already exists`, key
    })

    if (existingEmail) {
        return error_response('email')
    }
    else if(existingUsername){
        return error_response('username')	
    }
    else if (existingPhone){
        return error_response('phone')
    }
    else if (existingBusiness_name){
        return error_response('business_name')
    }

    //The nodemail feature for sending users email notification goes here.
});

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async(req, res, next) => {
    
    const user = await User.create({
        ...req.body,
    });

    sendTokenResponse(user, 200, res);
});

// @desc      Register Host
// @route     POST /api/v1/auth/registerHost
// @access    Public

exports.registerHost = asyncHandler(async(req, res, next) => {
    const { email } = req.body;

    const existingUser = await User.findOne({ email});

    if(existingUser) {
        return next(new errorResponse('User already exist with this email', 404));
    }

    //Create Host 
    const host = await Host.create({
        ...req.body,
    });

    sendTokenResponse(host, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
   
    //Validate email, username and password
    if ((!!email && !!username) || (!email && !username)) { //checks for username or email
        return next(new errorResponse('Please provide valid Username or Email.', 404));
    }
 
    if (!password) {
        return next(new errorResponse('Please provide valid Password.', 404));
    }

    //Check if registered Users or Hosts are available in the database
    const user = 
    (await User.findOne(email ? { email } : { username }).select('+password')) ||   (await Host.findOne({ email }).select('+password'));

    if (!user) {
        return next(new errorResponse('Invalid Credentials Entered', 401));
    }

    //check if password matches profile in the database
    const isMatch = await user.matchPassword(password);

    if(!isMatch) {
        return next(new errorResponse('Invalid Password Entered', 401));
    }

    sendTokenResponse(user, 200, res);
});

//@desc     Get Current logged in user
//@route    Get /api/v1/auth/profile
//@access   Private
exports.getProfile = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: req.user,
    });
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        ...req.body,
    };

    let user;

    if (req.user.role === 'user') {
        user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true,
        });
    } else if (req.user.role === 'host') {
        user = await Host.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true,
        });
    }

    if (!user) {
        return next(new errorResponse('Invalid Credentials', 401));
    }

    res.status(200).json({
        success: true,
        message: 'Details updated!',
        data: user,
    });
});

//@desc Update password
//@route PUT /api/v1/auth/updatepassword
//@access   Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
    let user;

    if (req.user.role === 'user') {
        user = await User.findById(req.user.id).select('+password');
    } else if (req.user.role === 'host') {
        user == await Host.findById(req.user.id).select('+password');
    }

    //Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(new errorresponse('Pasword is incorrect', 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
})
