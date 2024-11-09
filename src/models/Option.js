import mongoose from "mongoose";

// Define the schema for an option
const optionSchema = new mongoose.Schema({
  // Text of the option, required field
  text: { type: String, required: true },

  // Number of votes for the option, default is 0
  votes: { type: Number, default: 0 },

  // Reference to the related question, links to the Question model
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
});

// Create the Option model based on the schema
const Option = mongoose.model("Option", optionSchema);

// Export the Option model for use in other parts of the application
export default Option;
