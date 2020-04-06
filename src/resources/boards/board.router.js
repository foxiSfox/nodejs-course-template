const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  await res.json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res) => {
  const board = await boardService.getById(parseInt(req.params.boardId, 10));
  if (typeof board === 'undefined') {
    res.status(404);
  }
  return res.json(board);
});

router.route('/').post(async (req, res) => {
  const result = await boardService.create(req.body.title, req.body.columns);

  await res.json(result);
});

router.route('/:boardId').put(async (req, res) => {
  const board = await boardService.update(parseInt(req.params.boardId, 10), {
    title: req.body.title,
    columns: req.body.columns
  });

  return res.json(board);
});

router.route('/:boardId').delete(async (req, res) => {
  const result = await boardService.del(parseInt(req.params.boardId, 10));
  return res.json(result);
});

module.exports = router;
