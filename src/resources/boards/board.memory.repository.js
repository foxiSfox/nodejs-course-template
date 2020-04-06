const boards = [
  /* {
    id: uuid(),
    title: 'myBoard',
    columns: [
      {
        id: '1',
        title: 'myColumns',
        order: 0
      }
    ]
  }*/
];

const getAll = async () => {
  return boards ? boards : [];
};

const getById = async id => {
  return boards.find(item => {
    return item.id === id;
  }, id);
};

const create = async board => {
  board.columns = board.columns.map((item, index) => {
    item.id = (index + 1).toString();
    return item;
  });
  boards.push(board);
  return board;
};

const update = async (id, data) => {
  const boardIndex = boards.findIndex(item => {
    return item.id === id;
  }, id);

  if (boardIndex === -1) {
    return;
  }

  // eslint-disable-next-line guard-for-in
  for (const param in data) {
    if (param !== 'columns') {
      boards[boardIndex][param] = data[param];
      continue;
    }

    // eslint-disable-next-line guard-for-in
    for (const i in data.columns) {
      const columnIndex = boards[boardIndex].columns.findIndex(item => {
        return parseInt(item.id, 10) === parseInt(data.columns[i].id, 10);
      });

      if (columnIndex !== -1) {
        // eslint-disable-next-line guard-for-in
        for (const paramColumn in data.columns[i]) {
          boards[boardIndex][param][columnIndex][paramColumn] =
            data.columns[i][paramColumn];
        }
      } else {
        boards[boardIndex][param].push(data.columns[i]);
      }
    }
  }

  return {
    id: boards[boardIndex].id.toString(),
    title: boards[boardIndex].title,
    columns: boards[boardIndex].columns
  };
};

const del = async id => {
  const userIndex = boards.findIndex(item => {
    return item.id === id;
  }, id);

  if (userIndex !== -1) {
    boards.splice(userIndex, 1);
  }

  return true;
};

module.exports = { getAll, getById, create, update, del };
