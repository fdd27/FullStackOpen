interface bmiValues {
    heigh: number,
    mass: number,
}

const parseValues = (args: string[]): bmiValues => {
    if (args.length < 3) throw new Error('Not enough arguments');
    if (args.length > 3) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            heigh: Number(args[2]),
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

console.log(calculateBmi(185, 74));
