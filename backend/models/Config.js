const mongoose = require('mongoose')
const connectDB = async() => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/NewsHub");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectDB