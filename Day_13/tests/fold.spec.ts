import Fold from '../fold';

describe('fold', () => {
    it('should parse file to coords', () => {
        const coords = Fold.parseCoords();
        expect(coords).toEqual([
            [6, 10],
            [0, 14],
            [9, 10],
            [0, 3],
            [10, 4],
            [4, 11],
            [6, 0],
            [6, 12],
            [4, 1],
            [0, 13],
            [10, 12],
            [3, 4],
            [3, 0],
            [8, 4],
            [1, 10],
            [2, 14],
            [8, 10],
            [9, 0],
        ]);
    });

    it('should parse file to folds', () => {
        const folds = Fold.parseFolds();
        expect(folds).toEqual([
            ['y', '7'],
            ['x', '5'],
        ]);
    });

    it('should get the max X coord', () => {
        const coords = Fold.parseCoords();
        const maxX = Fold.getMaxX(coords);
        expect(maxX).toEqual(10);
    });

    it('should get max Y coordinate', () => {
        const coords = Fold.parseCoords();
        const maxY = Fold.getMaxY(coords);
        expect(maxY).toEqual(14);
    });

    it('should fill a 2d array with dots based on maxX and maxY', () => {
        const maxX = 10;
        const maxY = 14;
        const dots = Fold.fillDots(maxX, maxY);
        expect(dots).toEqual([
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ]);
    });

    it('should change dots to hashes based on 2d array of coords', () => {
        const coords = Fold.parseCoords();
        const maxX = Fold.getMaxX(coords);
        const maxY = Fold.getMaxY(coords);
        const dots = Fold.fillDots(maxX, maxY);
        const hashes = Fold.changeDotsToHashes(coords, dots);
        expect(hashes).toEqual([
            ['.', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.'],
            ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '#', '.', '.', '.', '.', '#', '.', '#'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '#', '.', '.', '.', '.', '#', '.', '#', '#', '.'],
            ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '#'],
            ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['#', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.'],
        ]);
    });

    it('should split the lines into a top and bottom array based on a line', () => {
        const coords = Fold.parseCoords();
        const maxX = Fold.getMaxX(coords);
        const maxY = Fold.getMaxY(coords);
        const dots = Fold.fillDots(maxX, maxY);
        const hashes = Fold.changeDotsToHashes(coords, dots);
        const [top, bottom] = Fold.verticalSplit(7, hashes);
        expect(top).toEqual([
            ['.', '.', '.', '#', '.', '.', '#', '.', '.', '#', '.'],
            ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '#', '.', '.', '.', '.', '#', '.', '#'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ]);
        expect(bottom).toEqual([
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '#', '.', '.', '.', '.', '#', '.', '#', '#', '.'],
            ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '#'],
            ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['#', '.', '#', '.', '.', '.', '.', '.', '.', '.', '.'],
        ]);
    });

    it('should overlay the flipped bottom array on the top array', () => {
        const coords = Fold.parseCoords();
        const maxX = Fold.getMaxX(coords);
        const maxY = Fold.getMaxY(coords);
        const dots = Fold.fillDots(maxX, maxY);
        const hashes = Fold.changeDotsToHashes(coords, dots);
        const [top, bottom] = Fold.verticalSplit(7, hashes);
        const mergedMap = Fold.flipBottom(bottom, top);
        expect(mergedMap).toEqual([
            ['#', '.', '#', '#', '.', '.', '#', '.', '.', '#', '.'],
            ['#', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.', '#'],
            ['#', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.'],
            ['.', '#', '.', '#', '.', '.', '#', '.', '#', '#', '#'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ]);
    });

    it('should split the into left and right arrays based on a line', () => {
        const coords = Fold.parseCoords();
        const maxX = Fold.getMaxX(coords);
        const maxY = Fold.getMaxY(coords);
        const dots = Fold.fillDots(maxX, maxY);
        const hashes = Fold.changeDotsToHashes(coords, dots);
        const [top, bottom] = Fold.verticalSplit(7, hashes);
        const mergedMap = Fold.flipBottom(bottom, top);
        const [left, right] = Fold.horizontalSplit(5, mergedMap);
        expect(left).toEqual([
            ['#', '.', '#', '#', '.'],
            ['#', '.', '.', '.', '#'],
            ['.', '.', '.', '.', '.'],
            ['#', '.', '.', '.', '#'],
            ['.', '#', '.', '#', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
        ]);
        expect(right).toEqual([
            ['#', '.', '.', '#', '.'],
            ['.', '.', '.', '.', '.'],
            ['#', '.', '.', '.', '#'],
            ['.', '.', '.', '.', '.'],
            ['#', '.', '#', '#', '#'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
        ]);
    });

    it('should reverse the right and merge the arrays', () => {
        const coords = Fold.parseCoords();
        const maxX = Fold.getMaxX(coords);
        const maxY = Fold.getMaxY(coords);
        const dots = Fold.fillDots(maxX, maxY);
        const hashes = Fold.changeDotsToHashes(coords, dots);
        const [top, bottom] = Fold.verticalSplit(7, hashes);
        const mergedMap = Fold.flipBottom(bottom, top);
        const [left, right] = Fold.horizontalSplit(5, mergedMap);
        const flippedRight = Fold.flipRight(right, left, 5);
        expect(flippedRight).toEqual([
            ['#', '#', '#', '#', '#'],
            ['#', '.', '.', '.', '#'],
            ['#', '.', '.', '.', '#'],
            ['#', '.', '.', '.', '#'],
            ['#', '#', '#', '#', '#'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
        ]);
    });
});
