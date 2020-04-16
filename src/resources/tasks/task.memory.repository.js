const Task = require('./task.model');

const getAll = async boardId => {
  return Task.find({ boardId });
};

const getById = async (boardId, taskId) => {
  return Task.findOne({ _id: taskId, boardId });
};

const create = async (boardId, task) => {
  task.boardId = boardId;
  return Task.create(task);
};

const update = async (boardId, taskId, task) => {
  const success = (await Task.updateOne({ _id: taskId, boardId }, task)).n;
  if (!success) {
    return;
  }
  return getById(boardId, taskId);
};

const del = async (boardId, taskId) => {
  return (await Task.deleteOne({ _id: taskId, boardId })).deletedCount;
};

module.exports = { getAll, getById, create, update, del };
