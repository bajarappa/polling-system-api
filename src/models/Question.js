import mongoose from "mongoose";

// Define the schema for a question
const questionSchema = new mongoose.Schema({
  // Title of the question, required field
  title: { type: String, required: true },

  // Array of option references, links to the Option model
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: "Option" }],
});

// Create the Question model based on the schema
const Question = mongoose.model("Question", questionSchema);

// Export the Question model for use in other parts of the application
export default Question;
