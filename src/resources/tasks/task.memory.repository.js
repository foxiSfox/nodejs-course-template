const tasks = [];

const getAll = async boardId => {
  return tasks.filter(item => {
    return item.boardId === boardId;
  });
};

const getById = async (boardId, taskId) => {
  const task = tasks.find(item => {
    return item.boardId === boardId && item.id === taskId;
  });
  console.log(tasks);
  console.log(taskId);
  console.log(task);
  if (typeof task === 'undefined') {
    return false;
  }

  return task;
};

const create = async (boardId, task) => {
  tasks.push(task);

  return task;
};

const update = async (boardId, taskId, task) => {
  const taskIndex = tasks.findIndex(item => {
    return item.boardId === boardId && item.id === taskId;
  });

  if (taskIndex === -1) {
    return;
  }

  // eslint-disable-next-line guard-for-in
  for (const param in task) {
    tasks[taskIndex][param] = task[param];
  }

  return {
    id: tasks[taskIndex].id.toString(),
    title: tasks[taskIndex].title,
    order: tasks[taskIndex].order,
    description: tasks[taskIndex].description,
    userId: tasks[taskIndex].userId ? tasks[taskIndex].userId.toString() : null
  };
};

const del = async (boardId, taskId) => {
  const taskIndex = tasks.findIndex(item => {
    return item.boardId === boardId && item.id === taskId;
  });

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return true;
  }

  return false;
};

module.exports = { getAll, getById, create, update, del };
