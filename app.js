const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000

const listener = () => {
  console.log(`Listening in on port ${port}.`)
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
if (process.env.NODE_ENV !== 'test') {
app.use(logger('dev'))
}
app.use('/motion', require('./app/motion/motion.router'))
app.use((req, res, next) => {
  res.status(404).json({error: {message: '404 Not Found'}})
})
app.listen(port, listener)