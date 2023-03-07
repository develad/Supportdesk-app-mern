const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { getTickets, createTicket } = require("../controllers/ticketController");

// With router.route we can chain different Methods
// With the "protect" we get only the user tickets when he is authenticated
router.route("/").get(protect, getTickets).post(protect, createTicket);

module.exports = router;
