import SmokeBasin from '../smoke-basin';

describe('smoke-basin', () => {
    const basin = [
        [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
        [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
        [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
        [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
        [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
    ];
    it('should return 2d array of input', () => {
        SmokeBasin.parseSmokeBasin();
        expect(SmokeBasin.smokeBasin).toEqual(basin);
    });
});
