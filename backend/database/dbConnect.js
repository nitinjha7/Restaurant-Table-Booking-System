import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
    await mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log(`Some error ocuured ${err}`);
    })
}

export default dbConnection;