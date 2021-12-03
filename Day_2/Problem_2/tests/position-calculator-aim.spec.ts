import PositionCalculator from '../position-calculator-aim';

describe('position-calculator-aim', () => {
    it('should return sum of positions', () => {
        const result = PositionCalculator.getSum(['forward 5', 'down 8', 'forward 3', 'up 2']);
        expect(result).toEqual([8, 24, 6]);
    });
});
