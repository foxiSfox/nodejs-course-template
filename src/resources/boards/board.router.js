const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const ValidationError = require('./../../Errors/ValidationError');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  await res.json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res) => {
  const board = await boardService.getById(req.params.boardId, 10);
  if (typeof board === 'undefined') {
    res.status(404);
  }
  return res.json(board);
});

router.route('/').post(async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.columns) {
      throw new ValidationError('Некорректные параметры');
    }

    const board = new Board({
      title: req.body.title,
      columns: req.body.columns
    });
    const result = await boardService.create(board);
    await res.json(result);
  } catch (err) {
    next(err);
    return false;
  }
});

router.route('/:boardId').put(async (req, res, next) => {
  try {
    if (!req.params.boardId) {
      throw new ValidationError('Некорректные параметры');
    }
    const board = await boardService.update(req.params.boardId, {
      title: req.body.title,
      columns: req.body.columns
    });

    return res.json(board);
  } catch (err) {
    next(err);
    return false;
  }
});

router.route('/:boardId').delete(async (req, res, next) => {
  try {
    if (!req.params.boardId) {
      throw new ValidationError('Некорректные параметры');
    }
    const result = await boardService.del(req.params.boardId);
    return res.json(result);
  } catch (err) {
    next(err);
    return false;
  }
});

module.exports = router;
