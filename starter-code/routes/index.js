const express = require('express');
const router  = express.Router();

const Celebrity = require('../models/celebrity');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/celebrities', (req, res, next) => {
  Celebrity.find({})
    .then(celebrities => {
      res.render('celebrities/index', { celebrities });
    })
    .catch(err => console.log(err))
});

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new');
});

router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      res.render('celebrities/show', { celebrity });
    })
    .catch(err => console.log(err))
});

router.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({ name, occupation, catchPhrase})
  newCelebrity.save()
  .then((celebrity) => {
    res.redirect('/celebrities')
  })
  .catch((error) => {
    res.redirect('/celebrities/new')
  })
});

router.post('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findOneAndDelete({ _id: req.params.id })
    .then(celebrity => {
      res.redirect('/celebrities');
    })
    .catch(err => console.log(err))
});

module.exports = router;
