import { countIncreases } from '../measurements-larger-then-previous';

describe('measurements-larger-then-previous', () => {
    it('should increment count if measurement is larger then previous', () => {
        const result = countIncreases([2, 3]);
        expect(result).toBe(1);
    });

    it('should not increment count if measurement is larger then previous', () => {
        const result = countIncreases([2, 3, 2]);
        expect(result).toBe(1);
    });

    it('should not increment count if first measurement', () => {
        const result = countIncreases([2]);
        expect(result).toBe(0);
    });

    it('should not increment count if first measurement', () => {
        const result = countIncreases([9105]);
        expect(result).toBe(0);
    });
});
