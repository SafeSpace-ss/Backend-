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

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String },
    number_guests: { type: Integer, required: true },
    number_bedrooms: { type: Integer, required: true },
    number_bathrooms: { type: Integer, required: true },
    property_type: { type: String, enum: ['FLAT', 'HOUSE'] },
    type: { type: String, enum: ['PRIVATE_ROOM', 'SHARED_ROOM', 'FULL'], required: true },
    bed_type: {type: String, enum:['SINGLE', 'DOUBLE', 'CONVERTIBLE', 'COUCH'], required: true},
    quantity: { type: Number, required: true, default: 1},
    image: { type: String, required: true },
    cloudinary_id: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    description: { type: String, required: true },
    vendor: {
      type: mongoose.Schema.ObjectId,
      ref: 'Vendor',
      required: true,
    },
    reviews: [ReviewSchema],
  },
  {
    timestamps: true,
  }
);

// Create Product slug from the name
ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Product', ProductSchema);
