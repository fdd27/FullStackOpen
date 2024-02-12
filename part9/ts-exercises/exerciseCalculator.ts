interface Inputs {
    dailyExerciseHours: number[],
    day: number
}

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseArgs = (args: string[]): Inputs => {
    args.splice(0, 2);

    const last: string = args.pop();
    let day: number = null;
    if (!isNaN(Number(last))) day = Number(last)
    else throw new Error('Last value is not a number.')

    const dailyExerciseHours: number[] = args.map(x => {
        if (!isNaN(Number(x))) return Number(x);
        else throw new Error('Not all values are numbers.');
    })

    return {
        dailyExerciseHours: dailyExerciseHours,
        day: day
    }  
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

try {
    const { dailyExerciseHours, day } = parseArgs(process.argv);
    console.log(calculateExercises(dailyExerciseHours, day));
    
}
catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) errorMessage += `\nError: ` + error.message;
    console.log(errorMessage);
    
}
