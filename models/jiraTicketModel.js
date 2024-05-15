const mongoose = require("mongoose");
const TicketSchema = new mongoose.Schema(
    {
      ticketId: {
        type: Number,
      },
      summary: {
        type: String,
      },
      status: {
        type: String,
      },
      description: {
        type: String,
      },
      parentId: {
        type: Number,
      },
      storyPoint: {
        type: Number,
      },
      ticketGuid: {
        type: String,
      },
      assignedTo: {
        type: String,
      },
      createdBy: {
        type: String,
      },
      projectId: {
        type: Number,
      },
      createdDate: {
        type: Date,
      },
    },
  
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Ticket", TicketSchema);