import SmokeBasin from '../smoke-basin';

describe('smoke-basin', () => {
    const basinRaw = `2199943210
    3987894921
    9856789892
    8767896789
    9899965678`;
    const basin = [
        [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
        [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
        [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
        [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
        [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
    ];
    it('should return 2d array of input', () => {
        SmokeBasin.parseSmokeBasin(basinRaw);
        expect(SmokeBasin.smokeBasin).toEqual(basin);
    });

    describe('post parse', () => {
        beforeEach(() => {
            SmokeBasin.parseSmokeBasin(basinRaw);
        });
        it('should return number if it is the smallest number in the vicinity', () => {
            const result = SmokeBasin.getSmallestAdjacent(1, 0);
            expect(result).toEqual(1);
        });

        it('should get an array of all the smallest numbers', () => {
            const result = SmokeBasin.getSmallestNumbers();
            expect(result).toEqual([1, 0, 5, 5]);
        });
    });
});
