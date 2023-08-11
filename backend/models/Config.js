const mongoose = require('mongoose')
    // const connectDB = async() => {
    //     try {
    //         await mongoose.connect("mongodb://0.0.0.0:27017/NewsHub");
    //         console.log("Connected to MongoDB");
    //     } catch (error) {
    //         console.error("Error connecting to MongoDB:", error);
    //     }
    // };
    // module.exports = connectDB


const Db = process.env.DATABASE

mongoose.connect(Db, {
        useNewUrlParser: true,

        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });