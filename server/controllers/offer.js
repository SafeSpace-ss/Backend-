const errorResponse = require('../utils/errorResponse');
const { dataUri } = require('../utils/multer');

const asyncHandler = require('../middleware/async');
const { cloudinary } = require('../middleware/cloudinary');

const Offer = require('../models/offer');

// @desc      Get all offers
// @route     GET /api/v1/offers
// @access    Public
exports.getOffers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults); 
});

// @desc      Get offer by id (single offer)
// @route     GET /api/v1/offers/:id
// @access    PUBLIC
exports.getOffer = asyncHandler(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id).populate({
    path: 'host',
    select: 'name email',
  });

  if (!offer) {
    return next(
      new errorResponse(`Offer not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: 'Offer retrieved!',
    data: offer,
  });
});

// @desc      Get all HOST offers by host id
// @route     GET /api/v1/offers/host/:hostId
// @access    Private(Admin)
exports.getOffersByHost = asyncHandler(async (req, res, next) => {
  const offers = await Offer.find({ host: req.params.hostId }).populate(
    {
      path: 'host',
      select: 'name email',
    }
  );

  if (!offers) {
    return next(
      new errorResponse(
        `Offers not found for host with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    message: 'Host offers retrieved!',
    data: offers,
  });
});





// @desc      Get offers via slug
// @route     GET /api/v1/offers/slug/:slug
// @access    PUBLIC
exports.getOfferBySlug = asyncHandler(async (req, res, next) => {
  const offer = await Offer.findOne({ slug: req.params.slug }).populate({
    path: 'host',
    select: 'name email',
  });

  if (!offer) {
    return next(
      new errorResponse(
        `Offer not found with slug of ${req.params.slug}`,
        404
      )
    );
  }
  
  res.status(200).json({
    success: true,
    message: 'Offer retrieved!',
    data: offer,
  });
});

// @desc      Create an offer
// @route     Post /api/v1/offers/createOffer
// @access    Private (host)
exports.createOffers = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new errorResponse(`No file found`, 404));
  }

  const file = dataUri(req).content;
  const result = await cloudinary.uploader.upload(file, { folder: 'offers' });
  try {
    const offer = await Offer.create({
      ...req.body,
      image: result.secure_url,
      cloudinary_id: result.public_id,
      rating: 0,
      numReviews: 0,
      host: req.user.id,
    });

    if (offer) {
      res.status(201).json({
        success: true,
        message: 'Offer Created',
        data: offer,
      });
    }
  } catch (err) {
    return next(new errorResponse(err, 404));
  }
});
//The above function is yet to be reviewed


// @desc      Update an offer
// @route     PATCH /api/v1/offers/:id
// @access    Private (Host)
exports.updateOffer = asyncHandler(async (req, res, next) => {
  let offer = await Offer.findById(req.params.id);

  if (!offer) {
    return next(
      new errorResponse(`Offer not found with id of ${req.params.id}`, 404)
    );
  }

  

  offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).send({
    success: true,
    message: 'Offer updated',
    data: offer,
  });
});

// @desc      Delete an offer
// @route     DELETE /api/v1/offers/:id
// @access    Private (Host & Admin)
exports.deleteOffer = asyncHandler(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);

  if (!offer) {
    return next(
      new errorResponse(`Offer not found with id of ${req.params.id}`, 404)
    );
  }

  

  offer.remove();

  res.status(200).json({
    success: true,
    message: 'Offer deleted!',
    data: {},
  });
});


// @desc      Post reviews
// @route     POST /api/v1/offers/:id/reviews
// @access    Public (Users)
exports.createReview = asyncHandler(async (req, res, next) => {
  const offer = await Offer.findById(req.params.id);
  const name = req.user.name;
  const { rating, comment } = req.body;

  if (!offer) {
    return next(
      new errorResponse(`Offer not found with id of ${req.params.id}`, 404)
    );
  }

  

  // checks if user has submitted review previously
  if (offer.reviews.find((x) => x.name === name)) {
    return next(new errorResponse(`You already submitted a review`, 400));
  }

  const review = {
    name,
    rating: Number(rating),
    comment,
  };
 
  offer.reviews.push(review);

  offer.numReviews = offer.reviews.length;

  offer.rating =
    offer.reviews.reduce((a, c) => c.rating + a, 0) / offer.reviews.length;

  await product.save();

  res.status(201).send({
    message: 'Review Created',
    data: review
  });
});
