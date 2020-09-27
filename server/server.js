const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');

const app = express();

const IP =require('os').networkInterfaces( )['wlp3s0'][0]['address'];
// try {
//     IP=require('os').networkInterfaces( )['wlp3s0'][0]['address'];
// } catch (error) {
//     console.log("Not connected to a network");
// }
const port = 4000;
const dbName = 'deepsocial'


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


// Allow Cross Origin Requests
app.use(cors());

// PASSPORT
app.use(passport.initialize());
require('./authentication/passport-config')(passport);

// MORGAN
app.use(morgan('dev'));


// COOKIE-PARSER
app.use(cookieparser());

// BODY-PARSER
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


// STATIC FILES
// app.use('/static',express.static('static'));
// app.use(express.urlencoded())
app.use('/uploads',express.static('uploads'));

const allowCrossDomain = function(req, res, next) {
    // To allow Cross Origin Resource Sharing (CORS)
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

// ROUTES
let usersRoute = require('./routes/users.js');
app.use('/users',usersRoute);
let postsRoute = require('./routes/posts.js');
app.use('/posts',postsRoute);
let friendsRoute = require('./routes/friends.js');
app.use('/friends',friendsRoute);


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