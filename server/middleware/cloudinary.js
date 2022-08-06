const { config } = require('cloudinary');
const cloudinary = require('cloudinary').v2;
const { cloud_name, cloud_api_key, cloud_api_secret } = process.env

const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name,
    api_key: cloud_api_key,
    api_secret: cloud_api_secret,
  });

  next();
};

module.exports = { cloudinaryConfig, cloudinary };
