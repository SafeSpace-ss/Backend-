const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingItems: [
      {
        offer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Offer',
          required: true,
        },
        host: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Host',
          required: true,
        },
      },
    ],
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user', 
      required: true
    },
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', bookingSchema);