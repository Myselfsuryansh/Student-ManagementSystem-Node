const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
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
app.use("/api/v1/user", require("./routes/userRoute"));

// route
app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

const PORT = 8080;

// 2:30
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
