const usersRepo = require('./user.memory.repository');
const boardService = require('../boards/board.service');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getById = id => usersRepo.getById(id);

const create = user => usersRepo.create(user);

const update = (id, data) => usersRepo.update(id, data);
const del = async id => {
  const boards = await boardService.getAll();
  for (const board of boards) {
    const tasks = await taskService.getBoardTasks(board.id);
    for (const task of tasks) {
      await taskService.update(board.id, task.id, { userId: null });
    }
  }
  await usersRepo.del(id);
  return true;
};

module.exports = { getAll, getById, create, update, del };
