#### Safespace
A shortlet service api for real estate derivatives

### Safespace api
A basic feature of a shortlet service with the following features:

# Users can : 
- Register
- Login 
- Logout
- Update details
- Update password

## Usage
- Add "process.env" file to "/server" folder and update the values to your own
- Check "/server/process.txt" for sample.

## Install Dependencies
````
    npm install
````


# Run in dev mode
- npm run dev

# Run in prod mode
- npm start

# Run this before npm start
- npm install -g win-node-env (this install node.env globally)


### Routes and Payload 

```
## Authentication
- @desc      Register user 
- @route     POST /api/v1/auth/register
- @access    Public
- @payload   { name, username, phone, email, DOB {Day, Month, Year},  password, role }

- @desc      Register Host
- @route     POST /api/v1/auth/registerHost
- @access    Public
- @payload   { email, name, password, phone, business_name, address, state, role}

- @desc      Login user
- @route     POST /api/v1/auth/login
- @access    Public
- @payload   { email or username, password } 

- @desc      Update user details
- @route     PUT /api/v1/auth/updatedetails
- @access    Update
- @payload    {name or email or name and email}

- @desc      Update password
- @route     PUT /api/v1/auth/updatepassword
- @access    Private
- @payload   {password}



## Offers provided by Hosts

- @method    getOffers
- @desc      Get all offers 
- @route     GET /api/v1/offers
- @access    Public

- @method    getOffer
- @desc      Get offer by id (single offer)
- @route     GET /api/v1/offers/:id
- @access    PUBLIC
- @param     :offer_id

- @method    getOffersByHost
- @desc      Get all HOST offers by host id
- @route     GET /api/v1/offers/host/:hostId
- @access    Public

- @method    getOfferBySlug
- @desc      Get offers via slug
- @route     GET /api/v1/offers/slug/:slug
- @access    PUBLIC
- @param     :offer_slug

- @method    createOffers
- @desc      Create an offer
- @route     Post /api/v1/offers/createOffer
- @access    Public (Host)
- @payload   { title, image, price, number_bedrooms, number_bathrooms, property_type, type, bed_type, description }

- @desc      Update an offer
- @route     PATCH /api/v1/offers/:id
- @access    Public (Host)
- @payload   { title, price, number_bedrooms, number_bathrooms, property_type, type, bed_type, description }

- @desc      Delete an offer
- @route     DELETE /api/v1/offers/:id
- @access    Public (Host)
- @param     :offer_id


## Booking
- @method    getAllBookings
- @desc      Get all Bookings
- @route     GET /api/v1/booking/
- @access    Public

- @method    createBooking 
- @desc      Create Bookings
- @route     POST /api/v1/booking/createbooking
- @access    Public
- @payload   {[booking items], user, bookingId}

- @method    getBooking
- @desc      Get user booking by id
- @route     GET /api/v1/booking/:id
- @access    Public

- @method    getHostBookings
- @desc      Get host booking
- @route     GET /api/v1/booking/mybooking
- @access    Public(host)

- @method    deleteBooking
- @desc      delete booking
- @route     DELETE /api/v1/booking/:id
- @access    Public

- @method    getUserBooking
- @desc      Get all bookings by user
- @route     GET /api/v1/bookings/mine
- @access    Public(user)

## Reviews

- @desc      Post reviews
- @route     POST /api/v1/offerss/:id/reviews
- @access    Public 
- @payload   {name, rating ,comment}


## Admin

- @desc      Get all Users
- @route     GET /api/v1/users
- @access    Private (Admin)

- @desc      Get a User
- @route     GET /api/v1/users/:id
- @access    Private (Admin)
- @param     {:user_id}

- @desc      Delete User
- @route     Delete /api/v1/user/:id
- @access    Private (Admin)
- @param     {:user_id}

