const express = require('express');
const path = require('path');
//const createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var pedidos = require('./routes/pedidos');
var apiPedidos = require('./routes/apiPedido');
var indexRouter = require('./routes/index');

//Init app
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/node',{useNewUrlParser :true})
let db = mongoose.connection;

//Check Connection
db.once('open',function(){
  console.log('Connected to MongoDB');
});

//Check for db errors
db.on('error',function(err){
  console.log(err);
});

//view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());

app.use('/', pedidos);
app.use('/pedidos',apiPedidos);

module.exports = app;