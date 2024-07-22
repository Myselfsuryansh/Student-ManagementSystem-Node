const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const authMiddleware = require("./middlewares/authMiddleware");
// route:

// dotenv configuration

dotenv.config();

connectDb();

// middleware configuration
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/test", require("./routes/test.route"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user",authMiddleware, require("./routes/userRoute"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/student",authMiddleware, require("./routes/studentRoute"));
app.use("/api/v1/Auth", require("./routes/AuthRoute"));
app.use("/api/v1/Bank",authMiddleware, require("./routes/bankRoutes"));
app.use("/api/v1/Jira", authMiddleware,require("./routes/jiraRoutes"));
// route
app.get("/", (req, res) => {
  return res.status(200).send("Api is working Fine Here");
});

const PORT = 8080;

// 2:30
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
