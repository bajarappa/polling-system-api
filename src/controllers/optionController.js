import Option from "../models/Option.js";
import Question from "../models/Question.js";

export const createOption = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { text } = req.body;

    const option = new Option({ text, question: questionId, votes: 0 });
    await option.save();

    await Question.findByIdAndUpdate(questionId, {
      $push: { options: option._id },
    });

    // Dynamically generate link_to_vote for the new option
    const optionResponse = {
      id: option._id,
      text: option.text,
      votes: option.votes,
      link_to_vote: `http://localhost:3000/options/${option._id}/add_vote`,
    };

    res.status(201).json(optionResponse);
  } catch (error) {
    res.status(500).json({ error: "Failed to create option" });
  }
};

export const deleteOption = async (req, res) => {
  try {
    const { id } = req.params;
    const option = await Option.findById(id);
    if (option.votes > 0) {
      return res.status(400).json({ error: "Cannot delete option with votes" });
    }
    await option.deleteOne();
    res.status(200).json({ message: "Option deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete option" });
  }
};

export const addVote = async (req, res) => {
  try {
    const { id } = req.params;
    const option = await Option.findByIdAndUpdate(
      id,
      { $inc: { votes: 1 } },
      { new: true }
    );

    // Generate response structure with link_to_vote
    const optionResponse = {
      id: option._id,
      text: option.text,
      votes: option.votes,
      link_to_vote: `http://localhost:8000/options/${option._id}/add_vote`,
    };

    res.status(200).json(optionResponse);
  } catch (error) {
    res.status(500).json({ error: "Failed to add vote" });
  }
};
