import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      dbName: "backendAPI",
    })
    .then((c) =>
      console.log(`Database Connection established with ${c.connection.host}`)
    )
    .catch((e) => console.log(e));
};
