import FileParser from '../libraries/parse-data';

export default class Fold {
    static cameraMap: string[][];

    // function that fills a map of'.'s with a range of x and y coordinates
    public static parseCoords(): number[][] {
        const coords = FileParser.readFile('./Day_13/test-model.txt')
            .split('\n\r\n')[0]
            .split('\n')
            .map((row) =>
                row
                    .trim()
                    .split(',')
                    .map((coord) => parseInt(coord, 10)),
            );
        return coords;
        // const maxX = FileParser.getMaxX();
        // const maxY = FileParser.getMaxY();
        // const filled positions
        // for (let i = 0; i < x; i++) {
        //     for (let j = 0; j < y; j++) {
        //         map.set(`${i},${j}`, '.');
        //     }
        // }
    }

    public static parseFolds(): string[][] {
        const folds = FileParser.readFile('./Day_13/test-model.txt')
            .split('\n\r\n')[1]
            .split('\n')
            .map((row) => row.trim().replace('fold along ', '').split('='));
        return folds;
    }

    public static getMaxX(coords): number {
        const maxX = coords.reduce((acc, curr) => {
            if (curr[0] > acc) {
                return curr[0];
            }
            return acc;
        }, 0);
        return maxX;
    }

    public static getMaxY(coords): number {
        const maxY = coords.reduce((acc, curr) => {
            if (curr[1] > acc) {
                return curr[1];
            }
            return acc;
        }, 0);
        return maxY;
    }

    public static fillDots(maxX: number, maxY: number): string[][] {
        const map = [];
        for (let i = 0; i < maxY + 1; i++) {
            map[i] = [];
            for (let j = 0; j < maxX + 1; j++) {
                map[i][j] = '.';
            }
        }
        return map;
    }

    public static changeDotsToHashes(coords: number[][], dots: string[][]): string[][] {
        for (let i = 0; i < coords.length; i++) {
            dots[coords[i][1]][coords[i][0]] = '#';
        }
        return dots;
    }
}
