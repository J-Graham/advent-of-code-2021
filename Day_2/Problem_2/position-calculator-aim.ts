import FileParser from '../../libraries/parse-data';

export default class PositionCalculatorAim {
    static getSum(positions: string[]): number[] {
        let positionSum: number[] = [0, 0, 0];

        for (let i = 0; i < positions.length; i++) {
            const [position, depth] = positions[i].split(' ');
            if (position === 'forward') {
                positionSum[0] += Number(depth);
                positionSum[1] += positionSum[2] * Number(depth);
            } else if (position === 'down') {
                positionSum[2] += Number(depth);
            } else {
                positionSum[2] -= Number(depth);
            }
        }

        return positionSum;
    }
    static calculatePosition(positions: number[]): number {
        return positions[0] * positions[1];
    }

    static outputPosition(): void {
        const positions = FileParser.parseFile('./Day_2/Problem_2/model.txt');
        positions.pop();
        console.log('Position Aim: ', this.calculatePosition(this.getSum(positions)));
    }
}

PositionCalculatorAim.outputPosition();
