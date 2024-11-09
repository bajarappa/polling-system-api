import express from "express";
import {
  createOption,
  deleteOption,
  addVote,
} from "../controllers/optionController.js";

// Initialize the Express router
const router = express.Router();

// Route to create a new option for a specific question
// :questionId is the ID of the question to which the option will be added
router.post("/:questionId/create", createOption);

// Route to delete an option by its ID
// :id is the ID of the option to be deleted
router.delete("/:id/delete", deleteOption);

// Route to add a vote to a specific option
// :id is the ID of the option to add a vote to
router.post("/:id/add_vote", addVote);

// Export the router to use it in other parts of the application
export default router;
