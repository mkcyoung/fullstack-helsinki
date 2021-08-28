const calculateBmi = (height: number, weight: number) : string => {
    if (height === 0) throw new Error ('Can\'t divide by 0!')

    const bmi = weight / ((height / 100) ** 2)

    if (bmi < 18.5){
        return "Underweight"
    } else if (18.5 <= bmi && bmi <= 24.9) {
        return "Normal weight"
    } else if (25 <= bmi && bmi <= 29.9) {
        return "Overweight"
    } else if (bmi >= 30) {
        return "Obese"
    }
}

try {
    console.log(calculateBmi(180,74))
} catch (e) {
    console.log(e.message)
}
