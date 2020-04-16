const boardsRepo = require('./board.memory.repository.js');
const taskService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = board => boardsRepo.create(board);

const update = (id, data) => boardsRepo.update(id, data);
const del = async id => {
  const tasks = await taskService.getAll(id);
  for (const task of tasks) {
    await taskService.del(id, task.id);
  }

  await boardsRepo.del(id);
  return true;
};

module.exports = { getAll, getById, create, update, del };
