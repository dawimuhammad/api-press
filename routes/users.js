var express = require('express');
var router = express.Router();
const userController = require('../controllers/controller-user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router
  .post('/register', userController.register)

  .post('/login', userController.logIn)

  .get('/findUser/:userId', userController.findOne)

  .get('/findall', userController.findAll)

module.exports = router;
