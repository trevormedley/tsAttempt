export const floodFill = (click, cells) => {
  const checkArr = [findByXY(click, cells)];

  for (let i = 0; i < checkArr.length; i++) {
    const checkCell = checkArr[i];

    checkCell.isClicked = true;

    if (checkCell.neighbors === 0) {
      for (let dX = -1; dX <= 1; dX++) {
        for (let dY = -1; dY <= 1; dY++) {
          if (!(dX === 0 && dY === 0)) {
            const neighborCell = findByXY(
              { x: checkCell.x + dX, y: checkCell.y + dY },
              cells
            );
            if (
              neighborCell &&
              !neighborCell.isClicked &&
              !checkArr.includes(neighborCell)
            ) {
              checkArr.push(neighborCell);
            }
          }
        }
      }
    }
  }

  return cells;
};

export const findByXY = (click, cells) => {
  const { x, y } = click;
  return cells.reduce(
    (res, cur) => (cur.x === x && cur.y === y ? cur : res),
    null
  );
};

export const isAdjacent = (cell1, cell2) => {
  const { x: x1, y: y1 } = cell1;
  const { x: x2, y: y2 } = cell2;

  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) < 2;
};
