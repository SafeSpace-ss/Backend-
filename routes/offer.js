const express = require('express');

const asyncHandler = require('../middleware/async');
const advancedResults = require('../middleware/advancedResult');
const { protect, authorize } = require('../middleware/validate');
const { cloudinaryConfig } = require('../middleware/cloudinary');

const { multerUploads } = require('../utils/multer');

const Host = require('../models/host');
const Offer = require('../models/offer');

const {
    getOffers,
    getOffer,  
    getOffersByHost,
    getHostOffers,
    getOfferBySlug,
    createOffers,
    updateOffer,
    deleteOffer,
    createReview
} = require('../controllers/offer'); 


const router = express.Router();

router.route('/').get(
        advancedResults(Offer, {
            path: 'host',
            select: 'name email',
        }),
        getOffers
    )
router.route('/createOffer').post(
        createOffers
    );

//Populate database with dummy data(offers)
router.route('/seed').get(
    asyncHandler(async (req, res) => {
        const host = await Host.findOne({ role: 'host' });

        if (host) {
            const offers = data.offers.map((offer) => ({
                ...offer,
                host: host.id,
            }));
            const createdOffers = await Product.create(products);
            res.send({ createdOffers });
        } else {
            res
                .status(500)
                .send({ message: 'No Host Found. first run /api/va/auth/seed'});
        }
    })
); 


router.route('/slug/:slug').get( getOfferBySlug );

router
    .route('/host/:hostId')
    .get( getOffersByHost );

router
    .route('/:id')
    .get( getOffer )
    .patch( updateOffer )
    .delete( deleteOffer );

router.route('/:id/reviews').post( createReview );

module.exports = router;
