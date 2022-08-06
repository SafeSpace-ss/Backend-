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
    .get(protect, authorize('admin'), advancedResults(Offer), getAllBookings)
    .post(protect, authorize('user'), createBooking);
    
router.route('/mine').get(protect, authorize('user'), getUserBooking);
router.route('/mybookings').get(protect, authorize('host'), getHostBookings);

router.route('/user/:userId').get(protect, authorize('admin'), getBookingByUser);

router.route('/:id').get(getBooking).delete(deleteBooking);

module.exports = router;
