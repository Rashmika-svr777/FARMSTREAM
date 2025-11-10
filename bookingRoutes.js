const express = require('express');
const router = express.Router();

let bookings = [];

router.post('/book-visit', (req, res) => {
  const { name, phone, date,time, guests, notes } = req.body;
  if (!name || !phone || !date || !guests) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newBooking = { id: bookings.length + 1, name, phone, date,time, guests, notes };
  bookings.push(newBooking);
  res.status(201).json({ message: 'Booking confirmed', booking: newBooking });
});

router.get('/book-visit', (req, res) => {
  res.json(bookings);
});

module.exports = router;

