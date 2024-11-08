import express from "express";
import questionRoutes from "./routes/questionRoutes.js";
import optionRoutes from "./routes/optionRoutes.js";

const app = express();

app.use(express.json());
// Basic route for testing
app.get("/", (req, res) => {
  res.send("Polling System API is running");
});
app.use("/questions", questionRoutes);
app.use("/options", optionRoutes);

export default app;
