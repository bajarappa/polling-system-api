import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/create", createQuestion);
router.delete("/:id/delete", deleteQuestion);
router.get("/:id", getQuestion);

export default router;
