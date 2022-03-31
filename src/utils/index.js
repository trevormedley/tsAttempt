export const generateRandomMines = (
  data = [],
  height = 0,
  width = 0,
  mines = 0
) => {
  let minesPlanted = 0;
  while (minesPlanted < mines) {
    let randomX = Math.floor(Math.random() * width);
    let randomY = Math.floor(Math.random() * height);
    if (!data[randomX][randomY].isMine) {
      data[randomX][randomY].isMine = true;
      minesPlanted++;
    }
  }
  return data;
};

export const getNeighbors = (i = 0, j = 0, data = 0, height = 0, width = 0) => {
  let neighbors = [];
  const surroundings = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  surroundings.forEach(([x, y]) => {
    const newX = i + x;
    const newY = j + y;
    if (newX >= 0 && newX < width && newY < height) {
      neighbors.push(data[newX][newY]);
    }
  });
  return neighbors;
};

export const generateNeighbors = (data = [], height = 0, width = 0) => {
  let dataCopy = data;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      let mines = 0;
      const area = getNeighbors(
        data[i][j].x,
        data[i][j].y,
        data,
        height,
        width
      );
      area.map((value) => {
        if (typeof value === "object") {
          if (value.isMine) {
            return mines++;
          }
        }
        return 0;
      });
      if (!mines) {
        dataCopy[i][j].isEmpty = true;
      }
      dataCopy[i][j].neighbors = mines;
    }
  }
  return dataCopy;
};
