var express = require('express');
require('dotenv').config()
//const expressSanitizer = require('express-sanitizer');

var router = express.Router();
const { check,validationResult } = require('express-validator/check');
var nodemailer = require('nodemailer');

var emailVal = require("email-validator");
var Message = require("../models/messages")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Frazer Portfolio' });

});



router.post("/", [



  check("name", 'name must not be empty.').isLength({ min: 1 }).trim().unescape(),
  check("email", 'Email must not be empty.').isLength({ min: 1 }).trim(),
  check("message", 'Message must not be empty.').isLength({ min: 1 }).trim(),
  check("email","Email must be an email").isEmail().normalizeEmail(),
  

]
  // Extract the validation errors from a request.
  ,(req, res, next) => {
   
   var errors = validationResult(req);

   console.log(req.body);

  

   if (!errors.isEmpty()) {
    console.log("NOT VALID DATA !!!");
    return res.status(422).jsonp(errors.array());
    // There are errors. Render form again with sanitized values/errors messages.
      // Error messages can be returned in an array using `errors.array()`.
   }  
    else{
      var name = req.body.name;
      var email = req.body.email;
      var message = req.body.message;

console.log(typeof name ==="string");  
console.log(typeof email ==="string");  
console.log(typeof message ==="string");  


    var storedmessage = new Message({
        name:name,
        email:email,
        message:message
      })
      console.log(storedmessage);

      // Data from form is valid.
      console.log(" Is valid data");

     console.log("the name " + name)
     storedmessage.save(function (err) {
      if (err) { return next(err); }
      console.log("success sending to db?")
         //successful - redirect to new book record.
      });


var transporter = nodemailer.createTransport({
  
  service: 'gmail',
  
  auth: {
    type: "login",
    user: process.env.USER,
    pass: process.env.PASS
     }
 });
console.log("sending mail")
 var mailOptions = {
  from:  email,
  to:  process.env.USER,
  subject: 'Message from ' + name + " at " + email,
  text: message
};

 



  

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.render('index', { title: 'Frazer Portfolio' });      }
    });
  




}});



module.exports = router;
