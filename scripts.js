
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('c89d944198e843f1892491c6e51896ce');

let date_ob = new Date();

let nowDate = ("0" + date_ob.getDate()).slice(-2);
let nowMonth = ("0" + date_ob.getMonth()).slice(.-2);
let nowYear = date_ob.getFullYear();

if(nowDate > 7) {
    let oldDate = nowDate-7;
    break;
} elseif(nowMonth = "03") {
    let oldDate = 28 - (7-nowDate);
} elseif(nowMonth = "05" OR "07" OR "10" OR "12") {
    let oldDate = 30 - (7-nowDate);
} else{
    let oldDate = 31 - (7-nowDate);
}

let fromDate = oldYear + "-" + oldMonth + "-" + oldDate
let toDate = nowYear + "-" + nowMonth + "-" + nowDate

console.log(fromDate);
console.log(toDate);

newsapi.v2.everything({
    qInTitle: 'blockchain'
    from: fromDate
    to: toDate
})



https://newsapi.org/v2/everything?qInTitle=(
    "blockchain"OR"artificial%20intelligence"OR"quantum%20computing"OR"drone"OR"machine%20learning"OR"no%20code")AND("investment"OR"regulation"OR")
    &from=2019-12-1
    &sortBy=popularity
    &apiKey=c89d944198e843f1892491c6e51896ce

    https://newsapi.org/v2/everything?q=apple&from=2019-12-29&to=2019-12-29&sortBy=popularity&apiKey=c89d944198e843f1892491c6e51896ce