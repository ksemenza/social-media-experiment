const router = require('express').Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Users = require('./user-model.js');
const restricted = require('./auth-middleware.js')


// REGISTER USER
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  Users.addUser(user)
      .then(saved => {
            const token = generateToken(user);
            res.status(201).json({message:"Register Successful", user: saved, token: token})
            console.log(token)
      })
      .catch(err => {
          res.status(500).json({error: err, message: 'Failure to add user'})
      });
});

//LOGIN USER
router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  Users.findUserByUsername(username)
      .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
              const token = generateToken(user); 
              res.status(200).json({message: 'Logged in successfully', token: token, user: user})
          } else {
              res.status(401).json({message: 'Invalid credentials. You shall not pass!'})
          }
      })
      .catch(err => {
          res.status(500).json({error: err, message: 'Failure to log in'})
      });
});

// GET STRAINS BY USER_ID
router.get('/:id/account', restricted, (req, res) => {
    const id = req.params.id;
    Users.getUserAccount(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: err, message: `Error User id ${id} strains were not found` })
    })
});

// GET ALL USER ACCOUNTS
// TODO MAKE ROLE BASE SIGN IN TO RETURN ALL USER ACCOUNTS
router.get('/', restricted, (req,res) => {

    Users.getUsers()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: err, message:`Error user id ${id} account was not found`})
    })
})

// GET USER BY ID
router.get('/:id', restricted, (req,res) => {
    const id = req.params.id;

    Users.findUserById(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: err, message:`Error user id ${id} was not found`})
    })
})

// DELETE USER BY ID
  router.delete('/:id', restricted, (req, res) => {
    const id = req.params.id;
    Users.removeUser(id)
        .then(response => {
            res.status(200).json({message: `Removed user with id ${id}`});
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

// UPDATE USER ACCOUNT
// TODO Update password to include password encryption
router.put('/:id', restricted, (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    Users.updateUser(id, updatedUser)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: err, message: `Error Strain id ${id} was not updated` })
    })
});

router.get('/:id/details', restricted, (req, res) => {
    const id = req.params.id;
    Users.getUserDetails(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error:err, message:`Error User's post id ${id} not found`})
    })
})

// TOKEN GENERATE AND AUTH
function generateToken(user) {
  const payload = {
      subject: user.id,
      username: user.username
  }
  const secret = process.env.JWT_SECRET || 'penguins live in the desert to eat cactus';
  const options = {
      expiresIn: '8h'
  }
  return jwt.sign(payload, secret, options);
}
module.exports = router;