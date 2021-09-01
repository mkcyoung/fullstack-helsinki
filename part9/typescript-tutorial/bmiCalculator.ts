interface BmiValues {
    height: number;
    weight: number;
  }

const parseCommandArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        if (Number(args[2]) === 0) throw new Error ('Can\'t divide by 0!');
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

export const parseQueryArgs = (height: string, weight: string): BmiValues => {
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        if (Number(height) === 0) throw new Error ('Can\'t divide by 0!');
        return {
            height: Number(height),
            weight: Number(weight)
        };
    } else {
      throw new Error('malformed input');
    }
};

export const calculateBmi = (height: number, weight: number) : string | undefined => {

    const bmi = weight / ((height / 100) ** 2);

    if (bmi < 18.5){
        return "Underweight";
    } else if (18.5 <= bmi && bmi <= 24.9) {
        return "Normal weight";
    } else if (25 <= bmi && bmi <= 29.9) {
        return "Overweight";
    } else if (bmi >= 30) {
        return "Obese";
    }
    return;
};

const isCalledDirectly = require.main === module;

if (isCalledDirectly){
    try {
        const { height, weight } = parseCommandArguments(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log("Error: ", e.message);
    }
}

