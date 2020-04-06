const users = [
  /* { id: 1, name: 'pavel', login: 'pavel', password: '123456' }, { id: 2, name: 'pavel', login: 'pavel', password: '123456' }, { id: 3, name: 'pavel', login: 'pavel', password: '123456' }*/
];

const getAll = async () => {
  return users ? users : [];
};

const getById = async id => {
  const user = users.find(item => {
    return item.id === id;
  }, id);

  if (typeof user !== 'undefined') {
    delete user.password;
  }

  return user;
};

const create = async user => {
  users.push(user);
  return user;
};

const update = async (id, data) => {
  const userIndex = users.findIndex(item => {
    return item.id === id;
  }, id);

  if (userIndex === -1) {
    return;
  }

  // eslint-disable-next-line guard-for-in
  for (const param in data) {
    users[userIndex][param] = data[param];
  }

  return {
    id: users[userIndex].id.toString(),
    name: users[userIndex].name,
    login: users[userIndex].login
  };
};

const del = async id => {
  const userIndex = users.findIndex(item => {
    return item.id === id;
  }, id);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
  }

  return true;
};

module.exports = { getAll, create, getById, update, del };
