const User = require('../models/user');
// const Book = require('../models/book_mdl');
const {check, validationResult} = require('express-validator/check');
const express = require('express');
const router = express.Router();

// registration validation
const arrValidate = [
                check('name', 'Please enter your name').not().isEmpty(),
                check('name', 'Please enter your name without numbers').isAlpha(),
                check('name', 'Username should contain 5 characters').isLength({min: 5}),
                check('email', 'Please enter a valid email').isEmail(),
                check('password', 'Please enter a valid password').isLength({min:2, max:12}),
                check('conf_password', 'Passwords should match').custom( (value, {req}) => value === req.body.password),
                check('email', 'Email already exists').custom(value =>{
                  return User.find({'email': value})
                    .then(user =>{
                    if(user.length)
                      return false;
                    else {
                      return true;
                    }
                  });
                })
              ],

// login validation
 validateLogin = [
                      check('email', 'Write your EMAIL please').isEmail(),
                      check('password', 'Write Your PASSWORD please').not().isEmpty(),
                      check('email', 'The EMAIL is not exist').custom( value => {
                        return User.findOne({email: value})
                        .then( user => {
                          if(user)
                          return true;
                          else {
                            return false;
                          }

                        });
                      }),
                      check('email', 'check Your EMAIL or PASSWORD').custom(
                        function(value, {req}){
                          return User.findOne({email: value, password: req.body.password})
                          .then( item => {
                            return item;
                          });
                        })];


// route  register
router.post('/register', arrValidate, function(req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.mapped() });
        }

    let newUser = new User({
      "name": req.body.name,
      "email": req.body.email,
      "password" : req.body.password,
      "conf_password": req.body.conf_password
  });
  newUser.save()
  .then(function(err, record){
    if(err) throw err;
    console.log(record);

  })
  .catch( function(err){
    console.log(err);
  });
  console.log(req.body);
  res.end('Welcome user');
});
 //route login
 router.post('/login', validateLogin, function(req, res){
   const errors =validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({errors: errors.mapped() });
    }
     User.findOne({email: req.body.email, pssword: req.body.pssword})
          .then(item => {
            req.session.userIsLoggdIn = item ;
            res.end();
          })
          .catch( err => {
            res.send(err);
          });
 });

//route for profile
router.get('/profile', function(req, res){
  if(req.session.userIsLoggdIn){
    res.json(req.session.userIsLoggdIn);
  }else{
    res.status(422).json({result: true})
  }
});


module.exports = router;
