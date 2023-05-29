import mongoose from "mongoose";
import app from "./app";
import config from "./config";

const run = async () => {
  try {
    await mongoose.connect(config.database_uri as string);
    console.log("Database connected 🛢🔥🛢🔥🛢");

    app.listen(config.port, () => {
      console.log(
        `The server is listening on port http://localhost:${config.port}`
      );
    });
  } catch (error) {
    console.log("Failed to connect Database", error);
  }
};
run();
