# Used Car Pricing API

## Application Flow

- Users sign up with email/password
- Users get an estimate for how much their car is worth based on the make/modle/year/mileage
- Users can report what they sold their vehicles for
- Admins have to approve reported sales

## Routes

- POST /auth/signup - Create a new user and sign in
  - Body - { email, password }
- POST /auth/signin - Sign in as an existing user
  - Body - { email, password }
- GET /reports - Get an estimate for the cars value
  - QS - make, model, year, mileage, longitude, latitude
- POST /reports - Report how much a vehicle sold for
  - Body - { make, model, year, mileage, longitude, latitude, price }
- PATCH /reports - Approve or reject a report submitted by a user
  - Body - { approved }
