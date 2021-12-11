import Dumbo from '../dumbo';

const smallSample = `11111
19991
19191
19991
11111`;

describe('dumbo', () => {
    it('should parse puzzle to 2d array', () => {
        Dumbo.parsePuzzle(smallSample);
        expect(Dumbo.dumboMap).toEqual([
            [1, 1, 1, 1, 1],
            [1, 9, 9, 9, 1],
            [1, 9, 1, 9, 1],
            [1, 9, 9, 9, 1],
            [1, 1, 1, 1, 1],
        ]);
    });

    describe('after parse', () => {
        beforeEach(() => {
            Dumbo.parsePuzzle(smallSample);
        });

        it('should increase all dumbo energy by 1', () => {
            Dumbo.step();
            expect(Dumbo.dumboMap).toEqual([
                [3, 4, 5, 4, 3],
                [4, 0, 0, 0, 4],
                [5, 0, 0, 0, 5],
                [4, 0, 0, 0, 4],
                [3, 4, 5, 4, 3],
            ]);
        });

        it('should increment flash when energy above 9', () => {
            Dumbo.flashes = 0;
            Dumbo.step();
            expect(Dumbo.flashes).toEqual(9);
        });

        it('should increment all adjacent dumbos', () => {
            Dumbo.incrementNeighbors(1, 1);
            expect(Dumbo.dumboMap).toEqual([
                [2, 2, 2, 1, 1],
                [2, 9, 10, 9, 1],
                [2, 10, 2, 9, 1],
                [1, 9, 9, 9, 1],
                [1, 1, 1, 1, 1],
            ]);
        });
    });
});
