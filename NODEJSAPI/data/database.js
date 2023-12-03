import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      dbName: "backendAPI",
    })
    .then(() => console.log("Database Connection established"))
    .catch((e) => console.log(e));
};
