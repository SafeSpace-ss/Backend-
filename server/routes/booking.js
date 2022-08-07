const express = require('express');

const advancedResults = require('../middleware/advancedResult');
const { protect, authorize } = require('../middleware/validate');

const Offer = require('../models/offer');

const {
    getAllBookings,
    createBooking,
    getBooking,
    getHostBookings,
    deleteBooking,
    getUserBooking,
    getBookingByUser,
} = require('../controllers/booking');

const router = express.Router();

router
    .route('/')
    .get( advancedResults(Offer), getAllBookings)
    .post(authorize('user'), createBooking);
    
router.route('/mine').get( getUserBooking);
router.route('/mybookings').get( getHostBookings);

router.route('/user/:userId').get( getBookingByUser);

router.route('/:id').get(getBooking).delete(deleteBooking);

module.exports = router;
