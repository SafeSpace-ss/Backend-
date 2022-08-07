const mongoose = require('mongoose');

const hostOrderSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true },
    products: [
      {
        name: { type: String, required: true },
        product: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],

    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Host',
        required: true,
    },

    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },

    paymentInfo: {
        transactionId: { type: Number, trim: true, required: true, unique: true },
        currency: { type: String, required: true },
        gateway: {
          type: String,
          required: [true, 'Payment Gateway should be included'],
          enum: ['flutterwave'], // more can be added later
          default: 'flutterwave',
        },
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

module.exports = mongoose.model('hostOrder', hostOrderSchema);
