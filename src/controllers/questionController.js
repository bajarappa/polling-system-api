import Question from "../models/Question.js";
import Option from "../models/Option.js";

// Controller to create a new question
export const createQuestion = async (req, res) => {
  try {
    // Extract title from request body
    const { title } = req.body;

    // Create a new question instance with the provided title
    const question = new Question({ title });
    await question.save();

    // Send a success response with the created question details
    res.status(201).json(question);
  } catch (error) {
    // Handle any errors during question creation
    res.status(500).json({ error: "Failed to create question" });
  }
};

// Controller to delete a question
export const deleteQuestion = async (req, res) => {
  try {
    // Extract question ID from request parameters
    const { id } = req.params;

    // Find the question by ID and populate its options
    const question = await Question.findById(id).populate("options");

    // Check if any options have votes; if so, prevent deletion
    if (question.options.some((option) => option.votes > 0)) {
      return res
        .status(400)
        .json({ error: "Cannot delete question with voted options" });
    }

    // Delete the question if no options have votes
    await question.deleteOne();

    // Send a success response indicating the question was deleted
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    // Handle any errors during question deletion
    res.status(500).json({ error: "Failed to delete question" });
  }
};

// Controller to retrieve a question and its options
export const getQuestion = async (req, res) => {
  try {
    // Extract question ID from request parameters
    const { id } = req.params;

    // Find the question by ID and populate its options
    const question = await Question.findById(id).populate("options");

    // Check if the question exists; if not, return a 404 response
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Format each option to include link_to_vote for voting
    const formattedOptions = question.options.map((option) => ({
      id: option._id,
      text: option.text,
      votes: option.votes,
      link_to_vote: `http://localhost:3000/options/${option._id}/add_vote`, // Link for voting on this option
    }));

    // Create a response structure with question details and formatted options
    const questionResponse = {
      id: question._id,
      title: question.title,
      options: formattedOptions,
    };

    // Send a success response with the question and its options
    res.status(200).json(questionResponse);
  } catch (error) {
    // Handle any errors during question retrieval
    res.status(500).json({ error: "Failed to retrieve question" });
  }
};
