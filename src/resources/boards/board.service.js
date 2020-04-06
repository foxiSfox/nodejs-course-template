const boardsRepo = require('./board.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = (title, columns) => boardsRepo.create(title, columns);

const update = (id, data) => boardsRepo.update(id, data);
const del = id => {
  taskService.getBoardTasks(id).then(tasks => {
    tasks.forEach(item => taskService.del(id, item.id));
    boardsRepo.del(id);
  });

  return true;
};

module.exports = { getAll, getById, create, update, del };
