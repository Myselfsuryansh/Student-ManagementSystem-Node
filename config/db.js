const mongoose = require('mongoose');

// Define your MongoDB connection string
const MONGO_URL = "mongodb+srv://suryanshsinha30:Bibhasinha@cluster0.rqxp410.mongodb.net/food-app";

// Connect to MongoDB
const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            
        });
        console.log(`Connected To Database ${mongoose.connection.host}`);
    } catch (error) {
        console.error('DB error: ' + error);
    }
}

module.exports = connectDb;