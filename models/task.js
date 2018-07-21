//For Tasks.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    Required: 'Enter the name of the task',
  },

  status: {
    type: String,
    enum: ['scheduled', 'pending', 'in process', 'on hold', 'completed', 'other'],
    default: ['pending']
  },

  note: [{type: Schema.Types.ObjectId, ref: 'Notes'}],
   
  info: {
    type: String,
  },

  comments: [
    String
  ] 

}, {
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;