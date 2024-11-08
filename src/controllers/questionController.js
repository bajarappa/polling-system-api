import Question from "../models/Question.js";
import Option from "../models/Option.js";

export const createQuestion = async (req, res) => {
  try {
    const { title } = req.body;
    const question = new Question({ title });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: "Failed to create question" });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id).populate("options");

    if (question.options.some((option) => option.votes > 0)) {
      return res
        .status(400)
        .json({ error: "Cannot delete question with voted options" });
    }

    await question.deleteOne();
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete question" });
  }
};

export const getQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id).populate("options");

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Format options to include link_to_vote
    const formattedOptions = question.options.map((option) => ({
      id: option._id,
      text: option.text,
      votes: option.votes,
      link_to_vote: `http://localhost:3000/options/${option._id}/add_vote`,
    }));

    const questionResponse = {
      id: question._id,
      title: question.title,
      options: formattedOptions,
    };

    res.status(200).json(questionResponse);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve question" });
  }
};
