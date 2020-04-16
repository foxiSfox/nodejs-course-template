const usersRepo = require('./user.memory.repository.js');
const boardService = require('../boards/board.service');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = user => usersRepo.create(user);

const update = (id, data) => usersRepo.update(id, data);
const del = async id => {
  const boards = await boardService.getAll();
  for (const board of boards) {
    const tasks = await taskService.getAll(board.id);
    for (const task of tasks) {
      await taskService.update(board.id, task.id, { userId: null });
    }
  }
  return usersRepo.del(id);
};

module.exports = { getAll, getById, create, update, del };
