const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan');

const app = express();

const IP = require('os').networkInterfaces( )['wlp3s0'][0]['address'];
const port = 4000;
const dbName = 'dbname'


// MODELS
// let SampleModel = require('./models/SampleModel');


// MONGOOSE
mongoose.connect(`mongodb://localhost/${dbName}`, {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    // Connected
    console.log("Connected to MongoDB !");
});


// MORGAN
app.use(morgan('dev'));


// BODY-PARSER
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


// STATIC FILES
// app.use('/static',express.static('static'));
// app.use(express.urlencoded())


// ROUTES
// let sampleRoute = require('./routes/sampleRoute.js');
// app.use('/route',sampleRoute);


// END POINTS
app.get('/',(req,res)=>{
    res.send('Server is running . . . ');
    // res.status(200).json({message:'Hello World'});
});


// START THE SERVER
app.listen(port,()=>{
    console.log(`Server started successfully`);
    console.log(`http://${IP}:${port}`);
});