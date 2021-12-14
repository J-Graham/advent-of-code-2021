import Polymer from '../polymer';

describe('polymer', () => {
    it('should parse the starting point of the polymer', () => {
        const result = Polymer.parseStartingPoint();
        expect(result).toEqual('NNCB');
    });

    it('should parse pair insertions to an object', () => {
        const result = Polymer.parsePairInsertions();
        expect(result).toEqual({
            CH: 'B',
            HH: 'N',
            CB: 'H',
            NH: 'C',
            HB: 'C',
            HC: 'B',
            HN: 'C',
            NN: 'C',
            BH: 'H',
            NC: 'B',
            NB: 'B',
            BN: 'B',
            BB: 'N',
            BC: 'B',
            CC: 'N',
            CN: 'C',
        });
    });

    it('should look at the starting point and insert when finding a pair', () => {
        const startingPoint = Polymer.parseStartingPoint();
        const pairs = Polymer.parsePairInsertions();
        const result = Polymer.fillPair(startingPoint, pairs);
        expect(result).toEqual('NCNBCHB');
    });

    it('should output the difference of the most common and least common pair', () => {
        const startingPoint = Polymer.parseStartingPoint();
        const pairs = Polymer.parsePairInsertions();
        let fills = Polymer.fillPair(startingPoint, pairs);

        for (let i = 0; i < 9; i++) {
            fills = Polymer.fillPair(fills, pairs);
        }
        let result = Polymer.findDifference(fills);
        expect(result).toEqual(1588);
    });

    // it('should create an object of each iteration', () => {
    //     const startingPoint = Polymer.parseStartingPoint();
    //     const pairs = Polymer.parsePairInsertions();
    //     const result = Polymer.fillPair(startingPoint, pairs);
    //     expect(result).toEqual({ 0: '' });
    // });
    //iterate the object and set a pairs count for each match
    // get initial counts
    // break connection to count object
    // loop over the pairs loaded from the initial pass
    // count = the count of the pair
    // subtract the count from the initial count
    // compare the first letter of the pair and the pair - add to count
    // compare the pair and the last letter - add to the count
});
