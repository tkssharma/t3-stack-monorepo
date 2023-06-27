import { config } from "dotenv";
config();

import app from "./app";

import { dbConnect } from "./database";

dbConnect();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port: " + (process.env.PORT || 3000));
});
