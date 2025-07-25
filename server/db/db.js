import mongoose from "mongoose";

const dbConnection = async () => {
  const mongoUri = process.env.MONGO_URI;
  try {
    await mongoose
      .connect(mongoUri)
      .then(() => console.log("Connected to DB"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.error(`Error Occur Connecting to DB: ${error}`);
    process.exit(1);
  }
};

export default dbConnection;
