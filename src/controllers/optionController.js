import Option from "../models/Option.js";
import Question from "../models/Question.js";

export const createOption = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { text } = req.body;
    const option = new Option({ text, question: questionId });
    await option.save();

    await Question.findByIdAndUpdate(questionId, {
      $push: { options: option._id },
    });
    res.status(201).json(option);
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
    res.status(200).json(option);
  } catch (error) {
    res.status(500).json({ error: "Failed to add vote" });
  }
};
