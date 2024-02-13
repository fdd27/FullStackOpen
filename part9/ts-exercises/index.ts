import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';

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
        res.send({
            weight: m,
            height: h,
            bmi: bmiResult
        });
    }
    else {
        throw new Error('malformatted parameters');
    }
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});