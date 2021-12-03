import PositionCalculator from '../position-calculator';

describe('position-calculator', () => {
    it('should return sum of positions', () => {
        const result = PositionCalculator.getSum(['forward 5', 'down 8', 'forward 3', 'up 2']);
        expect(result).toEqual([8, 6]);
    });

    it('should return multiple the 2 positions', () => {
        const result = PositionCalculator.calculatePosition([5, 3]);
        expect(result).toBe(15);
    });
});
