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

    it('should get 0 combination from segment', () => {
        SegmentSearch.getKnowns(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        SegmentSearch.parseZero(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
        const result = SegmentSearch.digits;
        expect(result).toEqual({ 0: 'bcdefg', 1: 'be', 2: '', 3: '', 4: 'bceg', 5: '', 6: '', 7: 'bde', 8: 'abcdefg', 9: '' });
    });

    // it('should popluate segment 6 after comparing 4 and 5 and current map', () => {
    //     SegmentSearch.getMappingForSegmentTwo('cgeb', ['fdcge', 'fecdb', 'fabcd']);
    //     const result = SegmentSearch.mapper;
    //     expect(result).toEqual({ 0: 'd', 1: 'd', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' });
    // });
});

// knowns:
// number 1 = 2, 5
// number 4 = 1, 2, 3, 5
// number 7 = 0, 2, 5
// number 8 = 0, 1, 3, 4, 5, 6

// 0 will contain numbers from 1, 8
// 2 will contain 7

// number 2 = 0, 2, 3, 4, 6

// unknowns:
// number 0 = 0, 1, 2, 4, 5, 6
// number 2 = 0, 2, 3, 4, 6
// number 3 = 0, 2, 3, 5, 6
// number 5 = 0, 1, 3, 5, 6
// number 6 = 0, 1, 3, 4, 5, 6
// number 9 = 0, 1, 2, 3, 5, 6

// acedgfb
// eafb
// dab
// ab

// ----
// -  a
// -  a
// ffff
// .  b(a/b)
// .  b(a/b)
// ----

// { 0: 'd', 1: 'e', 2: 'a', 3: 'f', 4: '', 5: 'b', 6: ''}

// while any key is empty
// loop over

// start with 3 to and compare to 2 missing is segment 0
// compare the 4 to 5 and segment 0 the missing is segment 6
// compare the 4 with 5 again and the extra letter in 4 is 2 segment
// compare object with 2 and get the 5th segement

// 6 will be the 5 + 1 letter (which will be object 4)

// abcdefg
// abef
// abd
// ab

/// cdfeb fcadb cdfeb cdbaf
