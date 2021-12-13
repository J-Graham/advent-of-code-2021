import SyntaxScoring, { Stack } from '../syntax-scoring';

describe('syntax-scoring', () => {
    // it('should parse the chunks', () => {
    //     SyntaxScoring.parseChunks();
    //     expect(SyntaxScoring.chunks).toEqual([
    //         '[({(<(())[]>[[{[]{<()<>>',
    //         '[(()[<>])]({[<{<<[]>>(',
    //         '{([(<{}[<>[]}>{[]{[(<()>',
    //         '(((({<>}<{<{<>}{[]{[]{}',
    //         '[[<[([]))<([[{}[[()]]]',
    //         '[{[{({}]{}}([{[{{{}}([]',
    //         '{<[[]]>}<{[{[{[]{()[[[]',
    //         '[<(<(<(<{}))><([]([]()',
    //         '<{([([[(<>()){}]>(<<{{',
    //         '<{([{{}}[<[[[<>{}]]]>[]]',
    //     ]);
    // });
    describe('after parse', () => {
        beforeEach(() => {
            SyntaxScoring.parseChunks();
        });
        it('should return an array of first illegal characters', () => {
            const result = SyntaxScoring.findFirstIllegalChars();
            expect(result).toEqual(['}', ')', ']', ')', '>']);
        });
        it('should filter out illegal chunks', () => {
            const result = SyntaxScoring.findFirstIllegalChars();
            expect(SyntaxScoring.chunks.length).toEqual(5);
        });
        it('should return true when closing char matches last item on the stack', () => {
            const stack = new Stack<string>();
            stack.push('(');
            const result = SyntaxScoring.isClosingChar(')', stack);
            expect(result).toBe(true);
        });
        it('should return closing chars', () => {
            const result = SyntaxScoring.findClosingChars('[({(<(())[]>[[{[]{<()<>>');
            expect(result).toEqual('}}]])})]');
        });
        it('should return autocomplete score', () => {
            const result = SyntaxScoring.getAutocompleteScores();
            expect(result).toEqual([288957, 5566, 1480781, 995444, 294]);
        });
    });
});
