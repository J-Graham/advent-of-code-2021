import FileParser from '../libraries/parse-data';

export default class Fold {
    static cameraMap: string[][];

    // function that fills a map of'.'s with a range of x and y coordinates
    public static parseCoords(): number[][] {
        const coords = FileParser.readFile('./Day_13/test-model.txt')
            .split('\n\n')[0]
            .split('\n')
            .map((row) =>
                row
                    .trim()
                    .split(',')
                    .map((coord) => parseInt(coord, 10)),
            );
        return coords;
    }

    public static parseFolds(): string[][] {
        const folds = FileParser.readFile('./Day_13/test-model.txt')
            .split('\n\n')[1]
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
        for (let i = 0; i <= maxY; i++) {
            map[i] = [];
            for (let j = 0; j <= maxX; j++) {
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

    public static verticalSplit(splitIndex: number, hashMap: string[][]): [string[][], string[][]] {
        const topArray = hashMap.slice(0, splitIndex);
        const bottomArray = hashMap.slice(splitIndex + 1);
        return [topArray, bottomArray];
    }

    public static flipBottom(bottomArray: string[][], topArray: string[][]): string[][] {
        const flippedBottomArray = bottomArray.slice().reverse();
        for (let i = 0; i < topArray.length; i++) {
            for (let j = 0; j < topArray[i].length; j++) {
                if (topArray[i][j] === '.') {
                    topArray[i][j] = flippedBottomArray[i][j];
                }
            }
        }
        return topArray;
    }

    public static horizontalSplit(splitIndex: number, hashMap: string[][]): [string[][], string[][]] {
        const leftArray = hashMap.map((row) => row.slice(0, splitIndex));
        const rightArray = hashMap.map((row) => row.slice(splitIndex + 1));
        return [leftArray, rightArray];
    }

    public static flipRight(rightArray: string[][], leftArray: string[][], splitIndex: number): string[][] {
        for (let i = 0; i < rightArray.length; i++) {
            for (let j = 0; j < rightArray[i].length; j++) {
                let deltaX = splitIndex - j - 1;

                leftArray[i][j] = leftArray[i][j] != '#' ? rightArray[i][deltaX] : '#';
            }
        }
        return leftArray;
    }

    public static outputFirstFold(): void {
        const coords = Fold.parseCoords();
        const maxX = Fold.getMaxX(coords);
        const maxY = Fold.getMaxY(coords);
        const dots = Fold.fillDots(maxX, maxY);
        const hashes = Fold.changeDotsToHashes(coords, dots);
        const foldOne = Fold.parseFolds()[0];
        let [top, bottom]: [string[][], string[][]] = [[], []];
        let [left, right]: [string[][], string[][]] = [[], []];
        let mergedMap: string[][] = [];
        if (foldOne[0] === 'y') {
            const splitIndex = parseInt(foldOne[1], 10);
            [top, bottom] = Fold.verticalSplit(splitIndex, hashes);
            mergedMap = Fold.flipBottom(bottom, top);
        } else {
            const splitIndex = parseInt(foldOne[1], 10);
            [left, right] = Fold.horizontalSplit(splitIndex, hashes);
            mergedMap = Fold.flipRight(right, left, splitIndex);
        }

        let dotCount = 0;
        let count = 0;

        for (let i = 0; i < mergedMap.length; i++) {
            for (let j = 0; j < mergedMap[i].length; j++) {
                if (mergedMap[i][j] === '#') {
                    dotCount++;
                } else {
                    count++;
                }
            }
        }
        console.log('Dot Count:', dotCount);
        console.log('Count:', count);
    }
}
Fold.outputFirstFold();
