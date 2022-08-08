const asyncHandler = require("../middleware/async");
const errorResponse = require("../utils/errorResponse");

const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({lenght: 10});

const Booking = require("../models/bookings");
const offer = require("../models/offer");
const User = require("../models/user");
const hostOrder = require("../models/hostOrder");

// @desc      Get all Bookings
// @route     GET /api/v1/booking/
// @access    Public
exports.getAllBookings = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc      Create Bookings
// @route     POST /api/v1/booking/createbooking
// @access    Public
exports.createBooking = asyncHandler(async (req, res, next) => {
    const { id: user } = req.user;
    const bookingId = uid();

    const booking = new Booking({
        ...req.body,
        bookingId: `SafeSpace-${bookingId}`,
        user,
    });
    console.log("BOOKING:   ", booking)

    const hostID = booking.bookingItems.map((item) => item.host);
    const hosts = hostID.filter((id, index) => hostID.indexOf(id)===index);

    console.log("Hosts", hosts);

    const bookingItems = booking.bookingItems;

    for(let host of hosts) {
        let hostItems = bookingItems.filter(item=> {
            console.log("Match:", item['host'] === host)
            console.log("Type Of host from booking", typeof(`${host}`))
            console.log("Type Of id in bookingitems", typeof(item['host']))

            if(`${item['host']}` == `${host}`) return true
            else return false
    });
    console.log("HostItem:  ", hostItems)
    }
});


// @desc      Get user booking by id
// @route     GET /api/v1/booking/:id
// @access    Public
exports.getBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return next(
            new errorResponse(`Booking not found with id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        message: 'Booking Retrieved!',
        data: booking,
    })
});


// @desc      Get host booking
// @route     GET /api/v1/booking/mybooking
// @access    Public(host)
exports.getHostBookings = asyncHandler(async (req, res, next) => {
    const booking = await hostOrder.find({ ve: req.user._id }).populate({
      path: 'User',
      select: 'name email',
    });
    const user = await User.findById(booking[0].user)
    const newBooking = {
      ...booking[0]._doc,
      buyer:user.name
    }
  
    if (!booking) {
      return next(
        new errorResponse(
          `Offers not found for Host with id of ${req.user.id}`,
          404
        )
      );
    } 
    res.status(200).json({
      success: true,
      message: 'Host offers retrieved!',
      data: [newBooking] 
    });
});


// @desc      delete booking
// @route     DELETE /api/v1/booking/:id
// @access    Public
exports.deleteBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(
      new errorResponse(`Booking not found with id of ${req.params.id}`, 404)
    );
  }

  offer.remove();

  res.status(200).json({
    success: true,
    message: 'Booking deleted!',
    data: {},
  });
});

// @desc      Get all bookings by user
// @route     GET /api/v1/bookings/mine
// @access    Public(user)
exports.getUserBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.find({ user: req.user.id});

  if(!booking) {
    return next(
      new errorResponse(`Bookings not found for user with id of ${req.user.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    message: 'User Booking Retrieved!',
    data: booking,
  })
});

