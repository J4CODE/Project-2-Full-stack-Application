const mongoose = require('mongoose');
const User     = require('../models/user');
const Task   = require('../models/task');

const dbName = 'notetastic'
mongoose.connect(process.env.MONGODB_URI);

const minorTask = {tasks_id: new mongoose.Types.ObjectId(), other: "", other: "", other: ""}
const majorTask = {tasks_id: new mongoose.Types.ObjectId(), other: "", other: "", other: ""}

const tasks = [minorTask, majorTask];

const task = [
  {
    task: "Task 1",
    taskDescription: "First Task",
    dailyGoal: 4
  },

  { 
    task: "Task 2",
    taskDescription: "First Task",
    dailyGoal: 4
  },

    {
    task: "Task 3",
    taskDescription: "First Task",
    dailyGoal: 4
    },

    {
    task: "Task 4",
    taskDescription: "First Task",
    dailyGoal: 4
    }
  ]
  
    
  //task.create method inside the .then for the task.create
      Task.create(task)
      .then((result)=>{
          console.log(`created ${result.length} task`);
          mongoose.disconnect();
      })
      .catch((err)=>{
          console.log(err)
      })
  
      //task.create ends here
  
  .catch((err)=>{
    console.log('didnt work', err)
  })
