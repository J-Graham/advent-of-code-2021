// load all the points from left to right and right to left
// start from the first point and go to the last point
import Passage from '../passage';

describe('passage', () => {
    it('should parse the input to paths array', () => {
        Passage.parseInput();
        expect(Passage.paths).toEqual([
            ['start', 'A'],
            ['A', 'start'],
            ['start', 'b'],
            ['b', 'start'],
            ['A', 'c'],
            ['c', 'A'],
            ['A', 'b'],
            ['b', 'A'],
            ['b', 'd'],
            ['d', 'b'],
            ['A', 'end'],
            ['end', 'A'],
            ['b', 'end'],
            ['end', 'b'],
        ]);
    });

    describe('after parse', () => {
        beforeEach(() => {
            Passage.parseInput();
        });
        it('should print all traversed paths', () => {
            const expected = Passage.findPaths('start');

            expect(expected).toEqual(10);
        });
    });
});
