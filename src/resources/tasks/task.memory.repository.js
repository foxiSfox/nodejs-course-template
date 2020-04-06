const tasks = [
  /* {
    id: 1,
    title: 'myTask',
    order: 0,
    description: 'task description',
    userId: 1,
    boardId: 1,
    columnId: 1
  }*/
];

const getBoardTasks = async boardId => {
  return tasks.filter(item => {
    return item.boardId === boardId;
  });
};

const getById = async (boardId, taskId) => {
  const task = tasks.find(item => {
    return item.boardId === boardId && item.id === taskId;
  });

  delete task.boardId;
  delete task.columnId;
  task.userId = task.userId.toString();
  task.id = task.id.toString();
  return task;
};

const create = async (boardId, task) => {
  const id = tasks.length + 1;

  tasks.push({
    id,
    title: task.title,
    order: task.order,
    description: task.description,
    userId: task.userId,
    boardId,
    columnId: task.columnId
  });

  return {
    id: id.toString(),
    title: task.title,
    order: task.order,
    description: task.description,
    userId: task.userId
  };
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
  }

  return true;
};

module.exports = { getBoardTasks, getById, create, update, del };
