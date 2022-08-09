const mongoose = require('mongoose');
const slugify = require('slugify');

const ReviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true, 
  }
);  

const OfferSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String },
    number_bedrooms: { type: Number, required: true },
    number_bathrooms: { type: Number, required: true },
    property_type: { type: String, enum: ['FLAT', 'HOUSE'] },
    type: { type: String, enum: ['PRIVATE_ROOM', 'SHARED_ROOM', 'FULL'], required: true },
    bed_type: {type: String, enum:['SINGLE', 'DOUBLE', 'CONVERTIBLE', 'COUCH'], required: true},
    image: { type: String, required: false },
    cloudinary_id: { type: String, required: false },
    price: { type: Number, required: true },
    rating: { type: Number, required: false },
    numReviews: { type: Number, required: false },
    description: { type: String, required: true },
    host: {
      type: mongoose.Schema.ObjectId,
      ref: 'Host',
      required: true,
    },
    reviews: [ReviewSchema],
  },
  {
    timestamps: true,
  }
);

// Create Product slug from the name
OfferSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Offer', OfferSchema);
