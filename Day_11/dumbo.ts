import FileParser from '../libraries/parse-data';

export default class Dumbo {
    static dumboMap: number[][] = [];
    static coordsToReset: number[][] = [];
    static coordsToFlash: number[][] = [];
    static flashes = 0;

    static parsePuzzle(): void {
        this.dumboMap = FileParser.readFile('./Day_11/model.txt')
            .split('\n')
            .map((row) => row.split('').map(Number));
    }

    static step(): void {
        for (let i = 0; i < this.dumboMap.length; i++) {
            for (let j = 0; j < this.dumboMap[i].length; j++) {
                this.dumboMap[i][j]++;
                if (this.dumboMap[i][j] === 10) {
                    this.coordsToFlash.push([j, i]);
                }
            }
        }

        while (this.coordsToFlash.length > 0) {
            const coord = this.coordsToFlash.pop();

            if (this.coordWasProcessed(coord)) {
                continue;
            }
            this.coordsToReset.push(coord);
            this.incrementNeighbors(coord[0], coord[1]);
        }

        for (let i = 0; i < this.coordsToReset.length; i++) {
            this.flashes++;
            this.dumboMap[this.coordsToReset[i][1]][this.coordsToReset[i][0]] = 0;
        }
        this.coordsToReset = [];
    }

    // function that accepts x and y coordinates and increments it's neighbors by 1 including diagonals
    static incrementNeighbors(x: number, y: number): void {
        if (x < 0 || y < 0 || x >= this.dumboMap[0].length || y >= this.dumboMap.length) {
            return;
        }
        const canDecrementY = y > 0;
        const canIncrementY = y < this.dumboMap.length - 1;
        const canDecrementX = x > 0;
        const canIncrementX = x < this.dumboMap[0].length - 1;

        if (canDecrementY) {
            this.incrementAndAddToFlash([x, y - 1]);
            if (canIncrementX) this.incrementAndAddToFlash([x + 1, y - 1]);
        }
        if (canDecrementX) {
            this.incrementAndAddToFlash([x - 1, y]);
            if (canIncrementY) this.incrementAndAddToFlash([x - 1, y + 1]);
        }
        if (canIncrementX) this.incrementAndAddToFlash([x + 1, y]);
        if (canDecrementX && canDecrementY) {
            this.incrementAndAddToFlash([x - 1, y - 1]);
        }

        if (canIncrementY) {
            this.incrementAndAddToFlash([x, y + 1]);
            if (canIncrementX) this.incrementAndAddToFlash([x + 1, y + 1]);
        }
    }

    static incrementAndAddToFlash(coord: number[]): void {
        this.dumboMap[coord[1]][coord[0]]++;
        if (this.dumboMap[coord[1]][coord[0]] >= 10 && !this.coordWasProcessed(coord)) {
            this.coordsToFlash.push(coord);
        }
    }
    static coordWasProcessed(coord: number[]): boolean {
        return JSON.stringify(this.coordsToReset).includes(JSON.stringify(coord));
    }

    static outputMap(steps = 1): void {
        this.parsePuzzle();
        for (let i = 0; i < steps; i++) {
            this.step();
        }
        console.log('flashes', this.flashes);
    }
}
// 35
Dumbo.outputMap(100);
