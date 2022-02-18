const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
// const fs = require("fs");
const bodyparser = require("body-parser");
const app = express();
const port = 80;

//------------------------------------------------------------------------------------------------------------------
main().catch(err => console.log(err));
async function main() {
  mongoose.connect('mongodb://localhost:27017/danceacademy_contact');
}

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    message: String
  });

  const Contact = mongoose.model('Contact', contactSchema);
  
  Contact.find( function(err, Contacts){
    if (err) return console.error(err);
    console.log(Contacts);
})
//------------------------------------------------------------------------------------------------------------------

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.status(200).render('contact.pug');
    }).catch(()=>{
        res.status(400).send("item was not saved");
    })

})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});