import axios from "axios";

const baseUrl = "http://localhost:5397";
const boardEndpoint = "/board";
const recordsEndpoint = "/records";
const resultEndpoint = "/result";

const boardReturnHandler = (res) => {
    return res.data;
}

export const requestBoard = (settings) => {
    
    const {click, options} = settings;

    const flatSettings = {
        userId: settings["userId"],
        clickX: click.x,
        clickY: click.y,
        difficulty: options.difficulty,
        boardWidth: options.boardWidth,
        boardHeight: options.boardHeight,
        mineCount: options.mineCount,
        timed: options.isTimed
    }
    
    axios.post(`${baseUrl}${boardEndpoint}`,flatSettings)
                                            .then(boardReturnHandler)
                                            .catch(alert("Unable to get board"))}