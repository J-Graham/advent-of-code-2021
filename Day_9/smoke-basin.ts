import FileParser from '../libraries/parse-data';

export default class SmokeBasin {
    static smokeBasin: number[][];
    static smallestCoords: number[][];
    static basins: number[][];
    static coordsToProcess: number[][] = [];
    static basinCordsProcessed: number[][];

    static parseSmokeBasin(input: string = ''): void {
        SmokeBasin.smokeBasin = [];
        this.basins = [];
        this.smallestCoords = [];
        const parsedBasin = [];
        if (input === '') {
            SmokeBasin.smokeBasin = FileParser.readFile('./Day_9/model.txt')
                .split('\n')
                .map((row) => {
                    parsedBasin.push(row.toString().trim().split('').map(Number));
                });
        } else {
            input.split('\n').map((row) => {
                parsedBasin.push(row.toString().trim().split('').map(Number));
            });
        }
        this.smokeBasin = parsedBasin;
    }

    static getSmallestAdjacent(x: number, y: number, saveCoords = false): number {
        let smallest = SmokeBasin.smokeBasin[y][x];
        const neighbors = [
            y > 0 ? SmokeBasin.smokeBasin[y - 1][x] : Number.MAX_VALUE,
            y < this.smokeBasin.length - 1 ? SmokeBasin.smokeBasin[y + 1][x] : Number.MAX_VALUE,
            x > 0 ? SmokeBasin.smokeBasin[y][x - 1] : Number.MAX_VALUE,
            x < this.smokeBasin[y].length - 1 ? SmokeBasin.smokeBasin[y][x + 1] : Number.MAX_VALUE,
        ];
        neighbors.forEach((neighbor, index) => {
            if (neighbor !== 9 && neighbor !== Number.MAX_VALUE && saveCoords) {
                // top, bottom, left, right
                if (index === 0 && !this.coordWasProcessed([x, y - 1])) {
                    this.coordsToProcess.push([x, y - 1]);
                } else if (index === 1 && !this.coordWasProcessed([x, y + 1])) {
                    this.coordsToProcess.push([x, y + 1]);
                } else if (index === 2 && !this.coordWasProcessed([x - 1, y])) {
                    this.coordsToProcess.push([x - 1, y]);
                } else if (index === 3 && !this.coordWasProcessed([x + 1, y])) {
                    this.coordsToProcess.push([x + 1, y]);
                }
            }
            if (neighbor <= smallest) {
                smallest = -1;
            }
        });
        return smallest;
    }

    static coordWasProcessed(coord: number[]): boolean {
        return (
            JSON.stringify(this.basinCordsProcessed).includes(JSON.stringify(coord)) ||
            JSON.stringify(this.coordsToProcess).includes(JSON.stringify(coord))
        );
    }

    static getSmallestNumbers(): number[] {
        const smallestNumbers = [];
        for (let i = 0; i < SmokeBasin.smokeBasin.length; i++) {
            for (let j = 0; j < SmokeBasin.smokeBasin[i].length; j++) {
                const smallest = this.getSmallestAdjacent(j, i);
                if (smallest >= 0) {
                    this.smallestCoords.push([j, i]);
                    smallestNumbers.push(smallest);
                }
            }
        }
        return smallestNumbers;
    }

    static crawlBasin(): void {
        this.parseSmokeBasin();
        const smallestNumbers = this.getSmallestNumbers();
        this.smallestCoords.forEach((smallest, index) => {
            const basin = [];
            this.basinCordsProcessed = [];
            this.coordsToProcess.push([smallest[0], smallest[1]]);
            basin.push(this.smokeBasin[smallest[1]][smallest[0]]);
            while (this.coordsToProcess.length > 0) {
                this.getSmallestAdjacent(this.coordsToProcess[0][0], this.coordsToProcess[0][1], true);
                this.basinCordsProcessed.push(this.coordsToProcess[0]);
                this.coordsToProcess.shift();
                if (this.coordsToProcess.length > 0) {
                    basin.push(this.smokeBasin[this.coordsToProcess[0][1]][this.coordsToProcess[0][0]]);
                }
            }
            this.basins.push(basin);
        });

        let output = 1;
        for (let i = 0; i < 3; i++) {
            const max = Math.max(...this.basins.map((el) => el.length));
            output *= max;
            this.basins.splice(
                this.basins.findIndex((el) => el.length === max),
                1,
            );
        }
        console.log(output);
    }

    static outputRiskLevel(): void {
        this.parseSmokeBasin();
        const smallestNumbers = this.getSmallestNumbers();
        const riskLevel = smallestNumbers.reduce((a, b) => a + b + 1, 0);
        console.log('risk level', riskLevel);
    }
}

SmokeBasin.crawlBasin();
