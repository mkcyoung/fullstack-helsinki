import * as _ from "lodash";

interface ExerciseValues {
    exercises: Array<number>;
    target: number;
  }

const parseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const numArr = args.slice(2).map( value => {
        if(isNaN(Number(value))){
            throw new Error ('Provided were values not numbers');
        } else {
            return Number(value);
        }
    });

    const target = numArr.slice(0)[0];
    const exercises = numArr.slice(1);

    if (target === 0) throw new Error ('Target amount must be greater than 0');

    return {
        exercises,
        target
    };
};

interface ExerciseReport {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (exercises: Array<number>, target: number): ExerciseReport  => {

    const average = _.mean(exercises);
    const percentage = average/(target) * 100;

    let rating = 0;
    let ratingDescription = 'none';

    if (percentage < 80) {
        rating = 1;
        ratingDescription = 'do. better.';
    } else if (percentage >= 80 && percentage <= 120) {
        rating = 2;
        ratingDescription = 'good work';
    } else if (percentage > 120) {
        rating = 3;
        ratingDescription = 'astounding! Should probably raise your target.';
    }

    return {
        periodLength: exercises.length,
        trainingDays: exercises.filter(x => x !== 0).length,
        success: target <= average,
        rating,
        ratingDescription,
        target,
        average
    };
};

const isCalledDirectly = require.main === module;

if (isCalledDirectly){
    try {
        const { exercises, target } = parseArguments(process.argv);
    console.log(calculateExercises(exercises, target));
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log("Error: ", e.message);
    }
}
