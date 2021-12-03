import FileParser from '../../libraries/parse-data';

export default class GroupIncrementer {
    static getGroup(numbers: number[], startIndex: number) {
        const endIndex = startIndex + 3;
        return numbers.slice(startIndex, endIndex);
    }
    static groupSums(numbers: number[]) {
        const groupSums = [];
        for (let i = 0; i < numbers.length; i++) {
            if (i + 3 <= numbers.length) {
                const group = this.getGroup(numbers, i);
                const sum = group.reduce((acc, curr) => acc + curr);
                groupSums.push(sum);
            }
        }
        return groupSums;
    }

    static countIncreases(numbers: number[]): number {
        let count = 0;
        const groupArray = this.groupSums(numbers);
        for (let i = 1; i < groupArray.length; i++) {
            if (groupArray[i] > groupArray[i - 1]) {
                count++;
            }
        }
        return count;
    }

    static outputIncreases(): void {
        const measurements = FileParser.parseFileToInt('./Day_1/Problem_2/model.txt');
        measurements.pop();
        console.log(this.countIncreases(measurements));
    }
}

// GroupIncrementer.outputIncreases();
