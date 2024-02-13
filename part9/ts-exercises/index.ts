import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    let h: number;
    let m: number;
    if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
        h = Number(req.query.height);
        m = Number(req.query.weight);
        const bmiResult = calculateBmi(h, m);
        res.json({
            weight: m,
            height: h,
            bmi: bmiResult
        });
    }
    else {
        res.status(400).send({ error: 'malformatted parameters' });
    }
});

app.post('/exercises', (req: express.Request, res: express.Response) => {
    const daily_exercises: number[] = [];
    let target: number;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.body && req.body.daily_exercises && req.body.target) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (Array.isArray(req.body.daily_exercises) && !isNaN(Number(req.body.target))) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            req.body.daily_exercises.forEach((e: unknown) => {
                if (!isNaN(Number(e))) daily_exercises.push(Number(e));
                else res.status(400).json({ error: 'malformatted parameters' });
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            target = Number(req.body.target);
            res.json(calculateExercises(daily_exercises, target));
        }
        else {
            res.status(400).json({ error: 'malformatted parameters' });
        }
    }
    else {
        res.status(400).json({ error: 'parameters missing'});
    }
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});