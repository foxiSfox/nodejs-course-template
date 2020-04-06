const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await taskService.getBoardTasks(
    parseInt(req.params.boardId, 10)
  );
  await res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const board = await taskService.getById(
    parseInt(req.params.boardId, 10),
    parseInt(req.params.taskId, 10)
  );
  if (typeof board === 'undefined') {
    res.status(404);
  }
  return res.json(board);
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const result = await taskService.create(parseInt(req.params.boardId, 10), {
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.body.boardId,
    columnId: req.body.columnId
  });

  await res.json(result);
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const task = await taskService.update(
    parseInt(req.params.boardId, 10),
    parseInt(req.params.taskId, 10),
    {
      id: req.body.id,
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.body.boardId,
      columnId: req.body.columnId
    }
  );

  return res.json(task);
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const result = await taskService.del(
    parseInt(req.params.boardId, 10),
    parseInt(req.params.taskId, 10)
  );
  return res.json(result);
});

module.exports = router;
