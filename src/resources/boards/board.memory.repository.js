const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getById = async id => {
  return Board.findOne({ _id: id });
};

const create = async board => {
  return Board.create(board);
};

const update = async (id, data) => {
  const success = (await Board.updateOne({ _id: id }, data)).n;
  if (!success) {
    return;
  }
  return getById(id);
};

const del = async id => {
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, getById, create, update, del };
