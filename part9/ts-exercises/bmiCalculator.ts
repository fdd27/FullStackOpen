interface bmiValues {
    height: number,
    mass: number,
}

const parseValues = (args: string[]): bmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            mass: Number(args[3])
        }
    } else throw new Error('Provided values were not numbers!');
}

const calculateBmi = (h: number, m: number): string => {
    const bmi: number = (m / (h**2))*10000;
    console.log(bmi.toFixed(3));
    
    if (bmi < 18.5) return 'Underweight';
    else if (bmi >= 18.5 && bmi < 25) return 'Normal weight';
    else if (bmi >= 25 && bmi < 30) return 'Overweight';
    else return 'Obese';
}

try {    
    const { height, mass } = parseValues(process.argv)
    console.log(calculateBmi(height, mass));
}
catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) errorMessage += `\nError: ${error.message}`
    console.log(errorMessage);
}
