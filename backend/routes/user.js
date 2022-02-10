const express = require('express');
const {check, validationResult, body} = require('express-validator');
const router = express.Router();
const helper = require('../config/helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/* API URL Example 
HTTP GET http://api.example.com/device-management/managed-devices  // Get all devices
HTTP GET http://api.example.com/device-management/managed-devices/{id}  // Get device for given Id
HTTP POST http://api.example.com/device-management/managed-devices  // Create new Device
HTTP PUT http://api.example.com/device-management/managed-devices/{id}  // Update device for given Id
HTTP DELETE http://api.example.com/device-management/managed-devices/{id}  // Delete device for given Id
*/

/* Get all users */
router.get('/', (req, res) => { 

  helper.database.table('user as u')
    .withFields([
      'u.userId',
      'u.firstName',
      'u.lastName',
      'u.userRole',
      'u.clientName',
      'u.email',
      'u.password',
      'u.streetAddress',
      'u.streetAddress2',
      'u.city',
      'u.provinceCode',
      'u.postalCode',
      'u.website',
      'u.created',
      'u.updated'
    ])
    .sort({ userId: 1})         // 1 (acending) -1 (descending)
    .getAll()                   // get all data
    .then(users => {
      if (users.length > 0) {
        res.status(200).json({
          count: users.length,
          users: users
        });
      } else {
        res.json({
          message: 'No users found'
        });
      }
    })
    .catch(err => console.log(err));

});


/* Get single user */
router.get('/:userId', (req, res) => {

  const userId = req.params.userId;
  console.log(userId);

  helper.database.table('user as u')
    .withFields([
      'u.userId',
      'u.firstName',
      'u.lastName',
      'u.userRole',
      'u.clientName',
      'u.email',
      'u.password',
      'u.streetAddress',
      'u.streetAddress2',
      'u.city',
      'u.provinceCode',
      'u.postalCode',
      'u.website',
      'u.created',
      'u.updated',
    ])
    .filter({ 'u.userId': userId })
    .get()                      // get single data
    .then(user => {
      if (user) {
        res.status(200).json({
          user
        });
      } else {
        res.json({
          message: `No user found with userId ${userId}`
        });
      }
    })
    .catch(err => console.log(err));

});


// Register (Add new user)
router.post('/register', async (req, res) => {
  
  let { 
    firstName,
    lastName,
    userRole,
    clientName,
    email,
    password,
    streetAddress,
    streetAddress2,
    city,
    provinceCode,
    postalCode,
    website,
    // created,
    // updated,
  } = req.body;

  let created = new Date().toISOString().slice(0, 19).replace('T', ' ');
  let updated = new Date().toISOString().slice(0, 19).replace('T', ' ');

  if (firstName === null || firstName === '') {
    res.json({message: 'firstName is required', success: false});
  } 
  else if (lastName === null || lastName === '') {
    res.json({message: 'lastName is required', success: false});
  }
  else if (email === null || email === '') {
    res.json({message: 'email is required', success: false});
  }
  else if (password === null || password === '') {
    res.json({message: 'password is required', success: false});
  }
  else {

    // check email duplication
    let userId = req.params.userId;
    helper.database.table('user').filter({email: email})
        .withFields([ 'email' ])
        .get().then(user => {
        if (user) {
          res.json({message: `the email is duplicated : ${email}`});
        } else {
            
        }
    }).catch(err => res.json(err) );

    // Insert to database
    helper.database.table('user')
      .insert({
        firstName: firstName,  
        lastName: lastName,
        userRole: userRole,
        clientName: clientName,
        email: email,
        password: password,
        streetAddress: streetAddress,
        streetAddress2: streetAddress2,
        city: city,
        provinceCode: provinceCode,
        postalCode: postalCode,
        website: website,
        created: created,
        updated: updated,
      })
      .then(result  => {
          console.log(result);
          if (result.insertId > 0) {
              res.status(201).json({message: `User successfully added with userId ${result.insertId}`});
          } else {
              res.status(501).json({message: 'Failed adding new user'});
          }
      })
      .catch(err => res.status(433).json({error: err}));
  }

});


module.exports = router;