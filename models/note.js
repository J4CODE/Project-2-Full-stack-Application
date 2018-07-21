//For notes.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    Required: ' Enter note for the task'
  },
  content: {
    type: String,
    Required: ' You can add a note'
  }
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;


