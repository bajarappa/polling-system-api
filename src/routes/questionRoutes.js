import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestion,
} from "../controllers/questionController.js";

// Initialize the Express router
const router = express.Router();

// Route to create a new question
// Endpoint: POST /questions/create
router.post("/create", createQuestion);

// Route to delete a question by its ID
// :id is the ID of the question to be deleted
// Endpoint: DELETE /questions/:id/delete
router.delete("/:id/delete", deleteQuestion);

// Route to retrieve a question by its ID along with its options
// :id is the ID of the question to retrieve
// Endpoint: GET /questions/:id
router.get("/:id", getQuestion);

// Export the router to make these routes available in other parts of the application
export default router;
