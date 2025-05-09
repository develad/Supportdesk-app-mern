const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

// Re-route into note router
// Combining tickets routes with the notes routes
const noteRouter = require("./noteRoutes");
router.use("/:ticketId/notes", noteRouter);

// With router.route we can chain different Methods
// With the "protect" we get only the user tickets when he is authenticated
router.route("/").get(protect, getTickets).post(protect, createTicket);
router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
