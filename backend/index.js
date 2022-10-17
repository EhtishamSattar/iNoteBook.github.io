const connectToMongoose=require('./db')
const express = require('express')

//! browser ko backend sy direct access nhi kr saktay... usky liye hmy express ka cors 
//! pakage install krna pry gha
var cors = require('cors')
 
connectToMongoose();

// express.js is a backend web application framework for node.js
const app = express()
app.use(cors())
// const port = 3000 //todo idr react app chaly ghi
const port=5000;

//! aesay bhi raita phelaya ja sakta tha but aek acha folder structure bnaye ghy ....
//! routes bnaye ghy or unko use kry ghy 

app.get('/', (req, res) => {
  res.send(' Assalam u Alaikum ~ Ehtisham');
})
// app.get('/api/v1/login', (req, res) => {
  //   res.send('hello login!')
  // })
  // app.get('/api/v1/signUp', (req, res) => {
    //   res.send('hello signUp!')
    // })
    
    //! Available Routes
    
    //todo TO use req.body , we have to use the middleWare
    app.use(express.json());
// first parameter is teh route for making a post request
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook app listening on port http://localhost:${port}`)
})