const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const auth = require('http-auth');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Keyword = mongoose.model('keywords');
const Document = mongoose.model('documents');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('c89d944198e843f1892491c6e51896ce');

var today = new Date();
var lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7)

let nowDate = ("0" + today.getDate()).slice(-2);
let nowMonth = today.getMonth() + 1;
nowMonth = ("0" + nowMonth).slice(-2)
let nowYear = today.getFullYear();

let oldDate = ("0" + lastWeek.getDate()).slice(-2);
let oldMonth = lastWeek.getMonth() + 1;
oldMonth = ("0" + oldMonth).slice(-2)
let oldYear = lastWeek.getFullYear();

let fromDate = oldYear + "-" + oldMonth + "-" + oldDate
let toDate = nowYear + "-" + nowMonth + "-" + nowDate

const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req, res) => {
  Document.find()
    .then((documents) => {
      res.render('feed', { title: 'Haystack', documents });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.get('/addition', auth.connect(basic), (req, res) => {
  res.render('form', {title: 'Haystack News'});
});

router.post(
  '/addition',
  [
    body('term')
      .isLength({ min: 1})
      .withMessage('Please enter a technology or indicator term'),
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

router.get('/datapull', auth.connect(basic), (req, res) => {
  res.render('pull', {title: 'Data Pull'});
});

router.post(
  '/datapull',
  (req, res) => {
      newsapi.v2.everything({
          qInTitle: 'crypto AND (ethereum OR litecoin) NOT bitcoin',
          from: fromDate,
          to: toDate,
          language: 'en',
          sortBy: 'relevancy',
      }).then(response => {
          console.log(response);
          document = response;
      });
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const document = new Document(req.body);
      document.save()
        .then(() => { res.send('Thank you for the new document!'); })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
    } else {
      console.log(req.body);
    }
  }
);

module.exports = router;


