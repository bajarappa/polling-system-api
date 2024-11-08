import express from "express";
import {
  createOption,
  deleteOption,
  addVote,
} from "../controllers/optionController.js";

const router = express.Router();

router.post("/:questionId/create", createOption);
router.delete("/:id/delete", deleteOption);
router.post("/:id/add_vote", addVote);

export default router;
