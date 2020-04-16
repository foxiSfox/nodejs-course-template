const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const getById = async id => {
  return User.findOne({ _id: id });
};

const create = async user => {
  return User.create(user);
};

const update = async (id, data) => {
  const success = (await User.updateOne({ _id: id }, data)).n;
  if (!success) {
    return;
  }
  return getById(id);
};

const del = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, create, getById, update, del };
