# Polling System API

The Polling System API is a backend system for managing questions and options in a polling application. It allows for creating questions with options, voting on specific options, and retrieving detailed information on questions and options. This API is designed for use with Node.js, Express, and MongoDB.

## Features

- **Question Management:** Create and delete questions.
- **Option Management:** Add options to specific questions and delete options if they have no votes.
- **Voting System:** Increment vote count on a specific option.
- **View Questions and Options:** Retrieve a question with all its associated options and their vote counts.

## Key Features

- **Question Creation**: Easily create new questions for polling.
- **Option Addition**: Attach options to specific questions.
- **Voting System**: Users can vote on individual options.
- **Delete Control**: Allows deletion of questions and options (only if no votes have been cast).
- **Detailed Viewing**: Retrieve questions with a complete list of options and current votes.

HTTP Method Endpoint Description
POST /questions/create Creates a new question
POST /options/:questionId/create Adds an option to a specific question
DELETE /questions/:id/delete Deletes a question if it has no votes
DELETE /options/:id/delete Deletes an option if it has no votes
POST /options/:id/add_vote Increases the vote count for an option
GET /questions/:id Retrieves a question along with its options
