const tasksRepo = require('./task.memory.repository');
const getBoardTasks = boardId => tasksRepo.getBoardTasks(boardId);

const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const create = (boardId, task) => tasksRepo.create(boardId, task);

const update = (boardId, taskId, task) =>
  tasksRepo.update(boardId, taskId, task);

const del = (boardId, taskId) => tasksRepo.del(boardId, taskId);

module.exports = { getBoardTasks, getById, create, update, del };