const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const ValidationError = require('./../../Errors/ValidationError');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  await res.json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res, next) => {
  try {
    if (!req.params.userId) {
      throw new ValidationError('Некорректные параметры');
    }

    const user = await usersService.getById(req.params.userId);
    return res.json(User.toResponse(user));
  } catch (err) {
    next(err);
    return false;
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.login || !req.body.password) {
      throw new ValidationError('Некорректные параметры');
    }

    const user = new User({
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });

    await usersService.create(user);
    await res.json(User.toResponse(user));
  } catch (err) {
    next(err);
    return false;
  }
});

router.route('/:userId').put(async (req, res, next) => {
  try {
    if (!req.params.userId) {
      throw new ValidationError('Некорректные параметры');
    }
    const user = await usersService.update(req.params.userId, {
      name: req.body.name,
      login: req.body.login,
      password: req.body.password
    });
    return res.json(User.toResponse(user));
  } catch (err) {
    next(err);
    return false;
  }
});

router.route('/:userId').delete(async (req, res, next) => {
  try {
    if (!req.params.userId) {
      throw new ValidationError('Некорректные параметры');
    }
    const result = await usersService.del(req.params.userId);
    return res.json(result);
  } catch (err) {
    next(err);
    return false;
  }
});

module.exports = router;
