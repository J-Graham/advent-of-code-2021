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

    it('should get initial object count', () => {
        const startingPoint = Polymer.parseStartingPoint();
        const pairs = Polymer.parsePairInsertions();
        const result = Polymer.getInitialPairCount(startingPoint);
        expect(result).toEqual({ NN: 1, NC: 1, CB: 1 });
    });

    it('should increase the count for next match', () => {
        const startingPoint = Polymer.parseStartingPoint();
        const pairs = Polymer.parsePairInsertions2();
        const initial = Polymer.getInitialPairCount(startingPoint);
        const qty = Polymer.getInitialQuantity(startingPoint);
        const result = Polymer.fillPair2(initial, qty, pairs, 1);

        expect(result).toEqual({
            N: 2,
            C: 2,
            B: 2,
            H: 1,
        });
    });

    it('should output the difference of the most common and least common pair part2', () => {
        const startingPoint = Polymer.parseStartingPoint();
        const pairs = Polymer.parsePairInsertions2();
        const initial = Polymer.getInitialPairCount(startingPoint);
        const qty = Polymer.getInitialQuantity(startingPoint);
        const fills = Polymer.fillPair2(initial, qty, pairs, 10);
        let result = Polymer.findDifferenceObject(fills);
        expect(result).toEqual(1588);
    });
});
