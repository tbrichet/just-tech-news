const router = require('express').Router();
const { User, Post, Vote } = require('../../models');

// GET ALL USERS /api/users
router.get('/', (req, res) => {
  // Access our User model and run findAll() medhod
  User.findAll({
    // Do not return password when searching users
    attributes: { exclude: ['password']}
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// GET ONE SPECIFIC USER /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
    // Do not return password when searching users
    attributes: { exclude: ['password']},
    where: {
      // find user by id
      id: req.params.id
    },
    include: [
    {
      model: Post,
      attributes: ['id', 'title', 'post_url', 'created_at']
    },
    // include the Comment model here:
    {
      model: Comment,
      attributes: ['id', 'comment_text', 'created_at'],
      include: {
        model: Post,
        attributes: ['title']
      }
    },
    {
      model: Post,
      attributes: ['title'],
      through: Vote,
      as: 'voted_posts'
    }
  ]
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id'});
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// POST CREATE NEW USER /api/users
router.post('/', (req, res) => {
  // expects { username:, email:, password:}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// POST USER LOGIN api/users/login
router.post('/login', (req, res) => {
  // expects { email:, password:}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!'});
      return;
    }
    
    //Verify user
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!'});
      return;
    }
    res.json({ user: dbUserData, message: 'You are now logged in!' });
  });
});

// PUT EDIT SPECIFIC USER DATA /api/users/1
router.put('/:id', (req, res) => {
  // expects { username, email, password}
  // if req.body has exact key/value pairs to match the model, you can just use 'req.body' instead
  User.update(req.body, {
    // allow hooks
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData[0]) {
      res.status(404).json({ message: 'No user found with this id'});
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE USER /api/users/1
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id'});
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;