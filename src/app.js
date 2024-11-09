import express from "express";
import questionRoutes from "./routes/questionRoutes.js";
import optionRoutes from "./routes/optionRoutes.js";

// Initialize the Express application
const app = express();

// Middleware to parse JSON bodies for incoming requests
app.use(express.json());

// Basic route for testing the server
// Endpoint: GET /
app.get("/", (req, res) => {
  res.send("Polling System API is running");
});

// Routes for question-related endpoints
// Endpoint: /questions
app.use("/questions", questionRoutes);

// Routes for option-related endpoints
// Endpoint: /options
app.use("/options", optionRoutes);

// Export the app for server setup or testing purposes
export default app;
