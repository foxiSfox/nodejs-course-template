const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

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

router.route('/').post(async (req, res) => {
  const board = new Board({
    title: req.body.title,
    columns: req.body.columns
  });
  const result = await boardService.create(board);
  await res.json(result);
});

router.route('/:boardId').put(async (req, res) => {
  const board = await boardService.update(req.params.boardId, {
    title: req.body.title,
    columns: req.body.columns
  });

  return res.json(board);
});

router.route('/:boardId').delete(async (req, res) => {
  const result = await boardService.del(req.params.boardId);
  return res.json(result);
});

module.exports = router;
