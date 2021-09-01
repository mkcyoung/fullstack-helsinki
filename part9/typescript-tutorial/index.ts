/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express = require('express');
import bodyParser from "body-parser";
import cors from "cors";
import { calculateBmi, parseQueryArgs } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
// import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if ( typeof height !== 'string' || typeof weight !== 'string'){
        res.status(500).json({ error: 'Invalid entry' });
        return;
    }
    try{
        const parsedQuery = parseQueryArgs(height, weight);
        const bmi = calculateBmi(parsedQuery.height, parsedQuery.weight);
        res.send({
            weight: parsedQuery.weight,
            height: parsedQuery.height,
            bmi
    }); } catch (e ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res.status(500).json({ error: e.message });
    }
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post('/exercises', (req: any, res: any) => {
 
  const body = req.body;
  const exercises = body.daily_exercises;
  const target = body.target;

  if (!target || !exercises){
    res.status(400).json({ error: "missing params"});
    return;
  }

  if (!Array.isArray(exercises)) {
    res.status(400).json( {error: "malformed params "});
    return;
  }
  
  const hasNaNVals = exercises.some( (a : any) => isNaN(Number(a)));

  if (isNaN(Number(target)) || hasNaNVals) {
    res.status(400).json( {error: "malformed params "});
    return;
  }

  res.send(calculateExercises(exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});