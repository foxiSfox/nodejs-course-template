const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  await res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const task = await taskService.getById(req.params.boardId, req.params.taskId);

  if (!task) {
    res.status(404);
  }

  return res.json(task);
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const task = new Task({
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.params.boardId,
    columnId: req.body.columnId
  });

  const result = await taskService.create(req.params.boardId, task);
  await res.json(result);
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const task = await taskService.update(req.params.boardId, req.params.taskId, {
    id: req.params.taskId,
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.params.boardId,
    columnId: req.body.columnId
  });

  return res.json(task);
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const result = await taskService.del(req.params.boardId, req.params.taskId);
  if (!result) {
    res.status(404);
  }

  return res.json(result);
});

module.exports = router;
