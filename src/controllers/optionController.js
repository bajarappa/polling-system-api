import Option from "../models/Option.js";
import Question from "../models/Question.js";

// Controller to create an option for a specific question
export const createOption = async (req, res) => {
  try {
    // Extract questionId from request parameters and text from request body
    const { questionId } = req.params;
    const { text } = req.body;

    // Create a new option instance with the provided text and question ID, initialize votes to 0
    const option = new Option({ text, question: questionId, votes: 0 });
    await option.save();

    // Update the question to include the new option's ID in its options array
    await Question.findByIdAndUpdate(questionId, {
      $push: { options: option._id },
    });

    // Generate response with the option details and link to vote for this option
    const optionResponse = {
      id: option._id,
      text: option.text,
      votes: option.votes,
      link_to_vote: `http://localhost:3000/options/${option._id}/add_vote`,
    };

    // Send a success response with the option details
    res.status(201).json(optionResponse);
  } catch (error) {
    // Handle any errors during option creation
    res.status(500).json({ error: "Failed to create option" });
  }
};

// Controller to delete an option
export const deleteOption = async (req, res) => {
  try {
    // Extract option ID from request parameters
    const { id } = req.params;

    // Find the option by ID
    const option = await Option.findById(id);

    // Check if the option has any votes; if so, prevent deletion
    if (option.votes > 0) {
      return res.status(400).json({ error: "Cannot delete option with votes" });
    }

    // Delete the option if it has no votes
    await option.deleteOne();

    // Send a success response indicating the option was deleted
    res.status(200).json({ message: "Option deleted successfully" });
  } catch (error) {
    // Handle any errors during option deletion
    res.status(500).json({ error: "Failed to delete option" });
  }
};

// Controller to add a vote to an option
export const addVote = async (req, res) => {
  try {
    // Extract option ID from request parameters
    const { id } = req.params;

    // Increment the vote count for the specified option and return the updated document
    const option = await Option.findByIdAndUpdate(
      id,
      { $inc: { votes: 1 } }, // Increment the votes by 1
      { new: true } // Return the updated document
    );

    // Generate response with the updated option details and link to vote
    const optionResponse = {
      id: option._id,
      text: option.text,
      votes: option.votes,
      link_to_vote: `http://localhost:3000/options/${option._id}/add_vote`,
    };

    // Send a success response with the updated option details
    res.status(200).json(optionResponse);
  } catch (error) {
    // Handle any errors during vote addition
    res.status(500).json({ error: "Failed to add vote" });
  }
};
