const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingItems: [
      {
        title: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        vendor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Vendor',
          required: true,
        },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },

    totalPrice: { type: Number, required: true },
    paymentInfo: {
      transactionId: { type: Number, trim: true, required: true, unique: true },
      currency: { type: String, required: true },
      
      status: String,
    },
    status: {
      type: String,
      required: true,
      enum: ['created', 'in-progress', 'complete'],
      default: 'created',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
