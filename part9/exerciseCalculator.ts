import * as _ from "lodash";

interface ExerciseReport {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (exercises: Array<number>, target: number): ExerciseReport  => {

    const average = _.mean(exercises)
    const percentage = average/(target) * 100

    let rating
    let ratingDescription

    if (percentage < 80) {
        rating = 1
        ratingDescription = 'do. better.'
    } else if (percentage >= 80 && percentage <= 120) {
        rating = 2
        ratingDescription = 'excellent work'
    } else if (percentage > 120) {
        rating = 3
        ratingDescription = 'astounding! Should probably raise your target.'
    }

    return {
        periodLength: exercises.length,
        trainingDays: exercises.filter(x => x !== 0).length,
        success: target <= average,
        rating,
        ratingDescription,
        target,
        average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))