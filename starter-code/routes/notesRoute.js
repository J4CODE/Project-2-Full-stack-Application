const express = require('express');
const router = express.Router();
const ensureLogin = require('connect-ensure-login');
const Task = require('../models/note');


router.get('/notes', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  notes.find()
    .then((responseFromDB) => {
      res.render('/', {
        responseFromDB
      });
    })
    .catch((err) => {
      next(err);
    })
});

//To get notes.
router.get('/notes/new', (req, res, next) => {
  Note.find()
    .then((allTheNotes) => {
      res.render('newNote', {
        allTheNotes
      });
    })
    .catch((err) => {
      next(err);
    })
});


//To create notes.
router.post('/notes/create', (req, res, next) => {
  const newNote = new Note({
    title: req.body.thetitle,
    content: req.body.content,
  })


  //To save notes.
  newNote.save()
    .then((response) => {
      res.redirect('/notes')
    })
    .catch((err) => {
      next(err);
    })
})


//Delete notes.
router.post('/notes/:id/delete', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then((reponse) => {
      res.redirect('/notes');
    })
    .catch((err) => {
      next(err);
    })
})


//For the notes route.
module.exports = ((app) => {
  const Note = require('/notes');

  notesRoute.Routes
  app.route('/notes')
    .get(notes.list_all_notes)
    .post(notes.create_a_note);


  app.route('/notes/:noteId')
    .get(notes.read_a_note)
    .put(notes.update_a_note)
    .delete(notes.delete_a_note);
});