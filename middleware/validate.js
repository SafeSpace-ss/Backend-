const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const errorResponse = require('../utils/errorResponse');
const { jwt_secret } = process.env
const User = require('../models/user');
const Host = require('../models/host');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) 
    {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    }
  
    // Make sure token exists
    if (!token) {
      return next(new errorResponse("Not authorized to access this route", 401));
    }
  
    try {
      // Verify token
      const decoded = jwt.verify(token, jwt_secret);
    
      req.user = await User.findById(decoded.id);
  
      if(!req.user){
        req.user = await Host.findById(decoded.id);
      }
      if(!req.user){
        return next(new errorResponse("Cannot find user", 401));
    
      }
  
      next();
    } catch (err) {
      return next(new errorResponse("Not authorized to access this route", 401));
    }
  });
  
  // Grant access to specific roles
  exports.authorize = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new errorResponse(
            `User role \'${req.user.role}'\ is not authorized to access this route`,
            403
          )
        );
      }
      next();
    };
  };
  