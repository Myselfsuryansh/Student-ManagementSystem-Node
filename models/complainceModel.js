const mongoose = require("mongoose");

const ComplianceIssueSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., "Non-Conformance", "Audit"
  status: { type: String, default: "Open" }, // Open, In Progress, Resolved, Overdue
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("complaince", ComplianceIssueSchema);
