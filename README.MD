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
- npm install

### Run App {

# Run in dev mode
- npm run dev

# Run in prod mode
- npm start

# run this before npm start
- npm install -g win-node-env (this install node.env globally)

# }

### Routes and Payload {

## Authentication
// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
// @payload   { name, username, phone, email, DOB{Day, Month,Year},  password, role }

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
// @payload   { email or username, password } 

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
// @payload    {name or email or name and email}

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
// @payload   {password}

### }

## Offers provided by Hosts

// @desc      Get all offers
// @route     GET /api/v1/offers
// @access    Public

// @desc      Get offer
// @route     GET /api/v1/offers/:id
// @access    PUBLIC
// @param     :offer_id

// @desc      Get offers via slug
// @route     GET /api/v1/offers/slug/:slug
// @access    PUBLIC
// @param     :offer_slug

// @desc      Create an offer
// @route     Post /api/v1/offers
// @access    Private (Host)
// @payload   { name, image, price, category, brand, countInStock, description }

// @desc      Update an offer
// @route     PATCH /api/v1/offers/:id
// @access    Private (Host)
// @payload   { name, image, price, category, brand, countInStock, description }

// @desc      Delete an offer
// @route     DELETE /api/v1/offers/:id
// @access    Private (Host)
// @param     :offer_id


## Reviews

// @desc      Post reviews
// @route     POST /api/v1/offerss/:id/reviews
// @access    Private (Host and Vendors)
// @payload   {name, rating ,comment}


## Admin

// @desc      Get all Users
// @route     GET /api/v1/users
// @access    Private (Admin)

// @desc      Get a User
// @route     GET /api/v1/users/:id
// @access    Private (Admin)
// @param     {:user_id}

// @desc      Delete User
// @route     Delete /api/v1/user/:id
// @access    Private (Admin)
// @param     {:user_id}

