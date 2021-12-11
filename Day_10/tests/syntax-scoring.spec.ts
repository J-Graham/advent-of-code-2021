import SyntaxScoring, { Stack } from '../syntax-scoring';

describe('syntax-scoring', () => {
    it('should parse the chunks', () => {
        SyntaxScoring.parseChunks();
        expect(SyntaxScoring.chunks).toEqual([
            '[({(<(())[]>[[{[]{<()<>>',
            '[(()[<>])]({[<{<<[]>>(',
            '{([(<{}[<>[]}>{[]{[(<()>',
            '(((({<>}<{<{<>}{[]{[]{}',
            '[[<[([]))<([[{}[[()]]]',
            '[{[{({}]{}}([{[{{{}}([]',
            '{<[[]]>}<{[{[{[]{()[[[]',
            '[<(<(<(<{}))><([]([]()',
            '<{([([[(<>()){}]>(<<{{',
            '<{([{{}}[<[[[<>{}]]]>[]]',
        ]);
    });
    describe('after parse', () => {
        beforeEach(() => {
            SyntaxScoring.parseChunks();
        });
        it('should return an array of first illegal characters', () => {
            const result = SyntaxScoring.findFirstIllegalChars();
            expect(result).toEqual(['}', ')', ']', ')', '>']);
        });
        // it('should filter out incomplete chunks', () => {
        //     SyntaxScoring.filterIncompleteChunks();
        //     expect(SyntaxScoring.chunks).toEqual([
        //     '[({(<(())[]>[[{[]{<()<>>',
        //     '{([(<{}[<>[]}>{[]{[(<()>',
        // })

        it('should return true when closing char matches last item on the stack', () => {
            const stack = new Stack<string>();
            stack.push('(');
            const result = SyntaxScoring.isClosingChar(')', stack);
            expect(result).toBe(true);
        });
    });
});
