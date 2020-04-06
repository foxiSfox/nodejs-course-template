const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  await res.json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res) => {
  const user = await usersService.getById(req.params.userId);
  return res.json(user);
});

router.route('/').post(async (req, res) => {
  const user = new User({
    name: req.body.name,
    login: req.body.login,
    password: req.body.password
  });

  await usersService.create(user);
  await res.json(User.toResponse(user));
});

router.route('/:userId').put(async (req, res) => {
  const user = await usersService.update(req.params.userId, {
    name: req.body.name,
    login: req.body.login,
    password: req.body.password
  });

  return res.json(user);
});

router.route('/:userId').delete(async (req, res) => {
  const result = await usersService.del(req.params.userId);
  return res.json(result);
});

module.exports = router;
