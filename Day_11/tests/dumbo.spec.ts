import Dumbo from '../dumbo';

// step
// increase energy by 1
// greater then 9 flashes
// increase all adjacent cells by 1 including diagonals
// can only flash onces per step
// if it flashes set it to 0

describe('dumbo', () => {
    it('should parse puzzle to 2d array', () => {
        Dumbo.parsePuzzle();
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
            Dumbo.parsePuzzle();
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
            expect(Dumbo.flashes).toEqual(8);
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
        // it('should increment surrounding dumbos when flashing', () => {
        //     Dumbo.flashes = 0;
        //     Dumbo.step();
        //     expect(Dumbo.dumboMap).toEqual([
        //         [3, 4, 5, 4, 3],
        //         [4, 0, 0, 0, 4],
        //         [5, 0, 0, 0, 5],
        //         [4, 0, 0, 0, 4],
        //         [3, 4, 5, 4, 3],
        //     ]);
        // });
    });
});
