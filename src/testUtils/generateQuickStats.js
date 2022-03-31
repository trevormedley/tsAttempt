const generateQuickStats = body => {

    const {difficulty, time} = body;
    const winPercent = parseFloat((Math.random() * 100).toFixed(1));
    const bestTime = Math.floor(Math.random() * 180) + 15;

    return {winPercent, bestTime: Math.min(bestTime, time)}

}