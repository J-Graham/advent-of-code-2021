// get a unique list of objects in the array
// get the distance between each object
// sum the distance and pick the lowest

import CrabSub from '../crab-sub';

describe('crab-sub', () => {
    const mockFileData = `16, 1, 2, 0, 4, 2, 7, 1, 2, 14`;
    const mockData = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
    const mockUniqueData = [16, 1, 2, 0, 4, 7, 14];

    it('should return parsed crab data', () => {
        expect(CrabSub.loadCrabs(mockFileData)).toEqual(mockData);
    });

    it('should return a unique list of elements in the array', () => {
        expect(CrabSub.getUniqueList(mockData)).toEqual(mockUniqueData);
        expect(CrabSub.dups).toEqual({ 1: 1, 2: 2 });
    });

    it('should return an the sum of the least hops to centralize the array', () => {
        expect(CrabSub.getUniqueList(mockData)).toEqual(mockUniqueData);
        expect(CrabSub.getLeastHops(mockUniqueData)).toEqual(168);
    });
});
