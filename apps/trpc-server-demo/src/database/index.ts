import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Database connected to ", db.connection.db.databaseName);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      process.exit(1);
    }
  }
};
