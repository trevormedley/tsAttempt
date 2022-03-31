const generateHighScores = (difficulty, userId) => {

    const scoreCount = Math.floor(Math.random() * 6);
    const DTOs = [];

    for (let h=0; h<scoreCount; h++) {
        DTOs.push(Math.floor(Math.random() * 300 + 30));
    }

    DTOs.sort((a,b)=>a-b);

    return {scores: DTOs};
    
}