import express = require('express');
import { calculateBmi, parseQueryArgs } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    let { height, weight } = req.query
    try{
        const parsedQuery = parseQueryArgs(height, weight)
        const bmi = calculateBmi(parsedQuery.height, parsedQuery.weight)
        res.send({
            weight: parsedQuery.weight,
            height: parsedQuery.height,
            bmi
    }); } catch (e) {
        res.status(500).send(e.message)
    }
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});