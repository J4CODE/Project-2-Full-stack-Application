const express = require('express');
const router = express.Router();
const ensureLogin = require('connect-ensure-login');
const Task = require('../models/task');


//Get and display all of the tasks
router.get('/tasks', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  if (!req.session.currentUser) {
    Task.find()
      .then((tasks) => {
        res.render('/', {
          tasks
        });
      })
      .catch((err) => {
        next(err);
      });
  }
});


//Create tasks.
router.post('/tasks/create', (req, res, next) => {
  const thename = req.body.name;
  const thestatus = req.body.status;
  const theinfo = req.body.info

  const blah = new Task({
    name: thename,
    status: thestatus,
    info: theinfo
  })


  blah.save()
    .then((response) => {
      res.redirect('/')
    })
    .catch((err) => {
      next(err);
    })

})


//-------------------------------------------------------------------------------------

//The code below is for the comments save button


router.post("/tasks/comments", (req, res, next) => {
  const myData = new Comment(req.body.myData);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


//End of comments save button code-----------------------------------------------------


//Delete tasks.
router.post('/task/:id/delete', (req, res, next) => {
  Task.findByIdAndRemove(req.params.id)
    .then((response) => {
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    })
})


router.get('/task/:id/edit', (req, res, next) => {
  Task.findById(req.params.id)
    .then((theTask) => {
      res.render('edit', {
        task: theTask
      })
    })
})


router.post('/task/:id/edit', (req, res, next) => {
  Task.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.render('index', {
        message: 'Task has been updated'
      })
      return;
    })
    .catch((err) => {
      next(err);
    })
})


//This renders the task info from the task links, inside the Modal pop up, when a link is clicked inside the Modal.
router.get('/task/:id', (req, res, next) => {
  const theID = req.params.id;
  Task.findById(theID)
    .then((theTask) => {
      res.render('task', {
        theTask
      })
    })
})


module.exports = router;