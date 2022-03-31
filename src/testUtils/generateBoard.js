const settings = {
    easy: {time: 300},

    medium: {time: 420}, //no, I'm not making a pot reference, this is 7 minutes!

    hard: {time: 600}
}

export const generateBoard = body => {

    console.log(body)

    const {click, options} = body;
    const {timed, difficulty, boardWidth, boardHeight, mineCount, customTime} = options;
    
    let time = customTime;

    if (settings[difficulty]) {
        time = settings[difficulty].time;
        const percent = Math.random();
        time = Math.max(30, Math.ceil(time * percent));
    }

    if (!timed) {
        time = -1;
    }

    const board = new Board(boardHeight, boardWidth);
    board.populateMines(mineCount, click, timed);
    board.calculateNeighbors();

    return {time, board: board.exportSpaceList()}

}

class Board {
    constructor (height, width) {
        this.width = width;
        this.height = height;
        this.populateMines = this.populateMines;
        this.calculateNeighbors = this.calculateNeighbors;
        this.exportSpaceList = this.exportSpaceList;
        this.spaces = [];

        this.#generateSpaces();
        
    }

    #generateSpaces() {
        for (let y=0; y<this.height; y++) {
            for (let x=0; x<this.width; x++) {
                this.spaces.push(new Space(x,y,false,false,0,false,false));
            }
        }
    }

    populateMines(mineCount, firstClick, includeTimed) {

        const possibleSpaces = this.#possibleSpaces(firstClick);
        for (let m = 0; m<mineCount; m++) {

            const minedSpace = this.#selectRandomSpace(possibleSpaces);
            minedSpace.isMine = true;

            if (includeTimed && m===0) {
                minedSpace.isTimed = true;
            }

            const minedIndex = this.#indexByXY(minedSpace.x, minedSpace.y, possibleSpaces);
            possibleSpaces.splice(minedIndex, 1);

        }
    }

    calculateNeighbors() {

        for (let i=0; i<this.spaces.length; i++) {
            let count = 0;
            for (let j=0; j<this.spaces.length; j++) {
                if (i !== j && this.spaces[j].isMine && this.#isAdjacent(this.spaces[i], this.spaces[j])) {
                    count++;
                }
            }
            this.spaces[i].neighbors = count;
        }

    }

    #isAdjacent(space1, space2) {

        const {x: x1, y: y1} = space1;
        const {x: x2, y: y2} = space2;

        return Math.sqrt((x1-x2)**2 + (y1-y2)**2) < 2;

    }

    #possibleSpaces(firstClick) {

        const clickedSpace = this.#findMineByXY(firstClick.x, firstClick.y);
        return this.spaces.filter(space=> !this.#isAdjacent(space, clickedSpace));

    }

    #selectRandomSpace(spaces) {

        const index = Math.floor(Math.random() * spaces.length)
        return spaces[index];

    }

    #findMineByXY(x, y) {

        return this.spaces.reduce((res,cur) => cur.x === x && cur.y === y ? cur : res,{})

    }

    #indexByXY(x,y,spaces) {

        return spaces.reduce((res, cur, ind)=> cur.x === x && cur.y === y ? ind : res,-1)
    }

    exportSpaceList() {

        const DTOs = []
        for (let i=0; i<this.spaces.length; i++) {
            const space = this.spaces[i]
            DTOs.push({x: space.x,
                        y: space.y,
                        isMine: space.isMine,
                        isTimed: space.isTimed,
                        neighbors: space.neighbors,
                        isClicked: space.isClicked,
                        isFlagged: space.isFlagged})
        }
        return DTOs;

    }
}

class Space {
    constructor (x,y,isMine,isTimed,neighbors, isClicked, isFlagged) {
        this.x = x;
        this.y = y;
        this.isMine = isMine;
        this.isTimed = isTimed;
        this.neighbors = neighbors;
        this.isClicked = isClicked;
        this.isFlagged = isFlagged;
    }
}