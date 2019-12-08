const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const auth = require('http-auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const Keyword = mongoose.model('Keywords');
const Document = mongoose.model('Documents');
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', auth.connect(basic), (req, res) => {
  res.render('form', {title: 'Newsletter Form'});
});

router.post(
  '/',
  [
    body('term')
      .isLength({ min: 1})
      .withMessage('Please enter a keyword'),
    body('category')
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const keyword = new Keyword(req.body);
      keyword.save()
        .then(() => { res.send('Thank you for your keyword!'); })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
    } else {
      console.log(req.body);
      res.render('form', {
        title: 'Keyword Form',
        errors: errors.array(), 
        data: req.body,
      });
    }
  }
);

router.get('/keywords', (req, res) => {
  Keyword.find()
    .then((keywords) => {
      res.render('index', { title: 'Listing keywords', keywords });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.get('/feed', (req, res) => {
  Document.find()
    .then((documents) => {
      res.render('feed', { title: 'Your News Feed', documents });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
});

module.exports = router;


