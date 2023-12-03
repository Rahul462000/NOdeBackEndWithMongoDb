import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

const PORT = process.env.PORT || 4000;
// console.log(process.env.PORT);

app.listen(process.env.PORT, () => {
  console.log(`server listening on ${PORT}`);
});
