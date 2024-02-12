interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (dailyExerciseHours: number[], day: number): Result => {
    const trainingDays: number = dailyExerciseHours.filter(h => h !== 0).length;

    let average: number = 0;
    dailyExerciseHours.forEach(h => average += h);
    average = average / dailyExerciseHours.length;

    const rating: number = Math.floor(Math.random() * 3);
    let ratingDescription: string = '';
    let success: boolean = false;

    switch (rating) {
        case 0:
            ratingDescription = 'Terrible';
            break;
        case 1:
            ratingDescription = 'Are you serious?';
            break;
        case 2:
            ratingDescription = 'Not too bad but could be better';
            break;
        case 3:
            ratingDescription = 'Not bad';
            success = true;
            break;
        default: ratingDescription = ''
    }

    return {
        periodLength: dailyExerciseHours.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: dailyExerciseHours[day],
        average: average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
