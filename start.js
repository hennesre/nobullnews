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

  
require('./models/Keywords');
const app = require('./app');

// const server = app.listen(process.env.PORT || 5000, () => {
//   console.log(`Express is running on port ${server.address().port}`);
// });

const port = process.env.PORT || 3000; 
app.listen(port);


