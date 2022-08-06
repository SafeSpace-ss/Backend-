const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { jwt_secret, jwt_expiry } = process.env;

const HostSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: [true, 'Email already exist'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    name: {
      type: String,
      required: [true, 'Please add full name'],
    },
    
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
    phone: {
      type: String,
      unique: [true, 'Phone Number already exists'],
      required: [true, 'Please add a phone number'],
    },
    
    business_name: {
      type: String,
      unique: [true, 'Business name already exists'],
      required: [true, 'Please add a business name'],
    },
    
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    city: {
      type: String,
      required: [true, 'Please add a city'],
    },
    state: {
      type: String,
      required: [true, 'Please add a state'],
    },
    terms: {
      type: Boolean,
      required: ['Please accept terms'],
    },
    id_num: {
      type: Number,
      required: ['Please add ID number'],
    },
    id_card: { type: String, required: [ 'Please upload ID'] },

    cloudinary_id: {
      type: String,
      required: [ 'Please provide cloudinary ID'],
    },
    role: {
      type: String,
      required: true,
      default: 'host',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },

  {
    timestamps: true,
  }
);
// Encrypt password using bcrypt before saving to database
HostSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
HostSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, jwt_secret, {
    expiresIn: jwt_expiry,
  });
};

// Match user entered password to hashed password in database
HostSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
HostSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('Host', HostSchema);
