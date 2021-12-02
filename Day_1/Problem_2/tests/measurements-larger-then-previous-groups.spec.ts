import { getGroup, groupSums, countIncreases } from '../measurements-larger-then-previous-groups';

describe('measurements-larger-then-previous-groups', () => {
    it('should return array group', () => {
        const result = getGroup([2, 3, 4, 5], 0);
        expect(result).toEqual([2, 3, 4]);
    });

    it('should return array group 2', () => {
        const result = getGroup([2, 3, 4, 5], 1);
        expect(result).toEqual([3, 4, 5]);
    });

    it('should return sum of groups', () => {
        const result = groupSums([2, 3, 4, 5]);
        expect(result).toEqual([9, 12]);
    });

    it('should increment count when group sum is larger then previous', () => {
        const result = countIncreases([2, 3, 4, 5]);
        expect(result).toEqual(1);
    });
});
