import FileParser from '../libraries/parse-data';

export default class Chiton {
    static unvisitedChitons = {};

    static parseChitonPositions(): number[][] {
        const chitonPositions: number[][] = [];
        FileParser.readFile('./Day_15/test-model.txt')
            .split('\n')
            .forEach((line, y) => {
                const [chitons, ...rest] = line.split('');
                chitonPositions.push([chitons, ...rest]);
                // for (let i = 0; i < chitons.length; i++) {
                // chitonPositions.push([{ key: y.toString() + i.toString(), value: parseInt(chiton, 10) }]);
                // }
            });
        // console.log(chitonPositions);
        return chitonPositions;
    }
    static getKey(y: number, x: number): string {
        return y.toString() + x.toString();
    }

    static getNeighborObj(key, value): { [key: string]: number } {
        return {
            [key]: value,
        };
    }

    static mapChitons(): void {
        const chitonLengths = this.parseChitonPositions();
        // loop to map neighbors to object
        for (let y = 0; y < chitonLengths.length; y++) {
            for (let x = 0; x < chitonLengths[y].length; x++) {
                const currentKey = this.getKey(y, x);
                const neighbors: {}[] | null = [
                    y > 0 ? this.getNeighborObj(this.getKey(y - 1, x), chitonLengths[y - 1][x]) : null,
                    y < chitonLengths.length - 1 ? this.getNeighborObj(this.getKey(y + 1, x), chitonLengths[y + 1][x]) : null,
                    x > 0 ? this.getNeighborObj(this.getKey(y, x - 1), chitonLengths[y][x - 1]) : null,
                    x < chitonLengths[y].length - 1 ? this.getNeighborObj(this.getKey(y, x + 1), chitonLengths[y][x + 1]) : null,
                ];
                neighbors.forEach((neighbor, index) => {
                    if (neighbor) {
                        if (!this.unvisitedChitons[currentKey]) {
                            this.unvisitedChitons[currentKey] = {};
                        }

                        Object.assign(this.unvisitedChitons[currentKey], neighbors[index]);
                    }
                });
            }
        }
        console.log('unvisited', this.unvisitedChitons);
    }
    // let graph = {
    // 	start: { A: 5, B: 2 },
    // 	A: { start: 1, C: 4, D: 2 },
    // 	B: { A: 8, D: 7 },
    // 	C: { D: 6, finish: 3 },
    // 	D: { finish: 1 },
    // 	finish: {},
    // };
}
Chiton.mapChitons();
// Chiton.parseChitonPositions();
