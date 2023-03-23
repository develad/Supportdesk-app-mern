const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    // Creating a connection between the notes to users and tickets
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Ticket",
    },

    text: {
      type: String,
      required: [true, "Please add some text"],
    },

    // For future creating a staff portal
    isStaff: {
      type: Boolean,
      default: false,
    },

    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Note", noteSchema);
