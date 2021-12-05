import FileParser from '../libraries/parse-data';

// parse input to array of plots
// fill an array of plots with the numbers from the input range
// count how many times multiple plots are made

export default class VentMapper {
    static parseCoords(rawCords: string): number[][][] {
        return rawCords.split('\n').map((a) => a.split(' -> ').map((a) => a.split(',').map(Number)));
    }

    static getLines(parsedCoords: number[][][]): number[][][] {
        return parsedCoords.filter((line) => line[0][0] == line[1][0] || line[0][1] == line[1][1]);
    }

    static getMaxValue(parsedCords: number[][][]): number {
        const removeDimension = parsedCords.map((cords) =>
            cords.map(function (row) {
                return Math.max.apply(Math, row);
            }),
        );
        var maxRow = removeDimension.map(function (row) {
            return Math.max.apply(Math, row);
        });
        return Math.max.apply(null, maxRow);
    }

    static getMap(maxValue: number): number[][] {
        const map = Array(maxValue + 1)
            .fill(0)
            .map(() => Array(maxValue + 1).fill(0));
        return map;
    }

    static getStart(line: number[][]): number[] {
        return [Math.min(line[0][0], line[1][0]), Math.min(line[0][1], line[1][1])];
    }

    static getEnd(line: number[][]): number[] {
        return [Math.max(line[0][0], line[1][0]), Math.max(line[0][1], line[1][1])];
    }

    static markMap(lines: number[][][], map: number[][]): number[][] {
        lines.forEach((line) => {
            const start = this.getStart(line);
            const end = this.getEnd(line);
            for (let i = start[0]; i <= end[0]; i++) {
                for (let j = start[1]; j <= end[1]; j++) {
                    map[i][j]++;
                }
            }
        });
        return map;
    }

    static getCountCordsMoreThanOne(map: number[][]): number {
        return map.reduce((total, curr) => (total += curr.filter((a) => a >= 2).length), 0);
    }

    static outputCount() {
        const rawCords = FileParser.readFile('Day_5/model.txt');
        const cords = this.parseCoords(rawCords);
        const lines = this.getLines(cords);

        const maxVal = this.getMaxValue(lines);

        let map = this.getMap(maxVal);

        map = this.markMap(lines, map);

        console.log('At Least two: ', this.getCountCordsMoreThanOne(map));
    }
}
VentMapper.outputCount();
