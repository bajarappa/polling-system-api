import app from "./src/app.js";
import { connectToMongoose } from "./src/config/connectToMongo.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectToMongoose();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
