const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('c89d944198e843f1892491c6e51896ce');

/*
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connection open on ${process.env.DATABASE}`);
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
});
*/

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

console.log(fromDate);
console.log(toDate);

/*
newsapi.v2.everything({
    qInTitle: 'crypto AND (ethereum OR litecoin) NOT bitcoin',
    from: fromDate,
    to: toDate,
    language: 'en',
    sortBy: 'relevancy',
}).then(response => {
    console.log(response);
    article = response;
});

*/