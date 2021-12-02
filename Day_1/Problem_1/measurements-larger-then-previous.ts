import { parseFile } from '../../libraries/parse-data';

export function countIncreases(measurements: number[]): number {
    let count = 0;
    for (let i = 1; i < measurements.length; i++) {
        if (measurements[i] > measurements[i - 1]) {
            count++;
        }
    }
    return count;
}

export function outputIncreases(): void {
    const measurements = parseFile('./Day_1/Problem_1/model.txt');
    measurements.pop();
    console.log(countIncreases(measurements));
}

outputIncreases();
