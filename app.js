import express from 'express';
import db from './db/db';
// Set up the express app
const app = express();
var cors = require('cors');
// get all todos

const csrf = require('csurf');
const cookieParser = require('cookie-parser');
//app.use(csrf());

//var csrfProtection = csrf({ cookie: true });
const csrfMiddleware = csrf({
    cookie: true
  });
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(csrfMiddleware);
 app.use((req, res, next) => {
    console.log('cookie: ', req.cookies); 
     next();
});
app.use(function (req, res, next) {
  res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true }); //set secure : true if using https
    res.cookie("XSRF-TOKEN",req.csrfToken());
    return next();
});
app.get('/api/v1/todos', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'todos retrieved successfully',
      body: req.body,
      todos: db
    })
  });
  app.post('/api/v1/todos', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'todos retrieved successfully',
      todos: db
    })
  });
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
