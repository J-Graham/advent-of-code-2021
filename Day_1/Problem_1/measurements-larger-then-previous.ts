import FileParser from '../../libraries/parse-data';

export default class Incrementer {
    static countIncreases(measurements: number[]): number {
        let count = 0;
        for (let i = 1; i < measurements.length; i++) {
            if (measurements[i] > measurements[i - 1]) {
                count++;
            }
        }
        return count;
    }

    static outputIncreases(): void {
        const measurements = FileParser.parseFileToInt('./Day_1/Problem_1/model.txt');
        measurements.pop();
        console.log(this.countIncreases(measurements));
    }
}

Incrementer.outputIncreases();
