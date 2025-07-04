const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const authMiddleware = require("./middlewares/authMiddleware");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const swaggerDocument = require('./swagger.json');

// route:

// dotenv configuration

dotenv.config();

connectDb();

// middleware configuration
app.use(cors({
  origin: '*', // or your Angular origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/test", require("./routes/test.route"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", authMiddleware, require("./routes/userRoute"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/student", authMiddleware, require("./routes/studentRoute"));
app.use("/api/v1/Auth", require("./routes/AuthRoute"));
app.use("/api/v1/Bank", authMiddleware, require("./routes/bankRoutes"));
app.use("/api/v1/Jira", authMiddleware, require("./routes/jiraRoutes"));
app.use("/api/v1/Report", require("./routes/dashboardRoutes"));
// route
app.get("/", (req, res) => {
  return res.status(200).send("Api is working Fine Here");
});

//Swagger Configuration:

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Student Database",
      version: "0.1",
      description:
        "This is the database for Student, Jira, Bank and so on made with express.js and document with Swagger",
    },
    contact:{
      name:"Suryansh Sinha",
    },

    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
    
  },
  apis: ['models/userModels.js']
  
};
const spacs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(spacs));
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerDocument));
const PORT = 8080;

// 2:30
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
