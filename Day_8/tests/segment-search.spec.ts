import SegmentSearch from '../segement-search';

describe('segment-search', () => {
    const entry = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;
    beforeEach(() => {
        SegmentSearch.parseSegment(entry);
    });
    it('should parse the input and output valuse', () => {
        expect(SegmentSearch.input[0]).toEqual(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        expect(SegmentSearch.output[0]).toEqual(['fdgacbe', 'cefdb', 'cefbgd', 'gcbe']);
    });

    it('should return the number of easy segments from output', () => {
        const result = SegmentSearch.getEasySegments();
        expect(result).toEqual(26);
    });

    it('should populate all the values that form 1, 4, and 7 ordered', () => {
        SegmentSearch.getKnowns(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        const result = SegmentSearch.digits;
        expect(result).toEqual({ 0: '', 1: 'be', 2: '', 3: '', 4: 'bceg', 5: '', 6: '', 7: 'bde', 8: 'abcdefg', 9: '' });
    });

    it('should get 9 combination from segment', () => {
        SegmentSearch.getKnowns(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseNine(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        const result = SegmentSearch.digits;
        expect(result).toEqual({ 0: '', 1: 'be', 2: '', 3: '', 4: 'bceg', 5: '', 6: '', 7: 'bde', 8: 'abcdefg', 9: 'bcdefg' });
    });

    it('should get 2 combination from segement', () => {
        SegmentSearch.getKnowns(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseNine(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseTwo(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        const result = SegmentSearch.digits;
        expect(result).toEqual({ 0: '', 1: 'be', 2: 'abcdf', 3: '', 4: 'bceg', 5: '', 6: '', 7: 'bde', 8: 'abcdefg', 9: 'bcdefg' });
    });

    it('should get 3 combination from segment', () => {
        SegmentSearch.getKnowns(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseNine(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseTwo(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseThree(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        const result = SegmentSearch.digits;
        expect(result).toEqual({ 0: '', 1: 'be', 2: 'abcdf', 3: 'bcdef', 4: 'bceg', 5: '', 6: '', 7: 'bde', 8: 'abcdefg', 9: 'bcdefg' });
    });

    it('should get 5 combination from segment', () => {
        SegmentSearch.getKnowns(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseNine(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseTwo(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseThree(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseFive(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        const result = SegmentSearch.digits;
        expect(result).toEqual({ 0: '', 1: 'be', 2: 'abcdf', 3: 'bcdef', 4: 'bceg', 5: 'cdefg', 6: '', 7: 'bde', 8: 'abcdefg', 9: 'bcdefg' });
    });

    it('should get 0 and 6 combination from segment', () => {
        SegmentSearch.getKnowns(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseNine(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseTwo(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseThree(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseFive(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseSixAndZero(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        const result = SegmentSearch.digits;
        expect(result).toEqual({
            0: 'abdefg',
            1: 'be',
            2: 'abcdf',
            3: 'bcdef',
            4: 'bceg',
            5: 'cdefg',
            6: 'acdefg',
            7: 'bde',
            8: 'abcdefg',
            9: 'bcdefg',
        });
    });
});

// knowns:
// number 1 = 2, 5
// number 4 = 1, 2, 3, 5
// number 7 = 0, 2, 5
// number 8 = 0, 1, 2, 3, 4, 5, 6
// number 3 = 0, 2, 3, 5, 6
// number 5 = 0, 1, 3, 5, 6

// 2 will contain all but 1 from 8

// unknowns:
// number 2 = 0, 2, 3, 4, 6
// number 0 = 0, 1, 2, 4, 5, 6 (2, not 3)
// number 6 = 0, 1, 3, 4, 5, 6 (3, not 2)
// number 9 = 0, 1, 2, 3, 5, 6 (3, no 4)

// { 0: 'd', 1: 'e', 2: 'a', 3: 'f', 4: '', 5: 'b', 6: ''}
