import BinaryDiagnostic from '../binary-diagnostic';

describe('binary-diagnostic', () => {
    it('should convert binary numbers to arrays based on index', () => {
        const result = BinaryDiagnostic.mapInput(['00100', '11110', '10110']);
        expect(result).toEqual(['011', '010', '111', '011', '000']);
    });

    it('should return the number that occurs the most', () => {
        const result = BinaryDiagnostic.getGamma(['011', '010', '111', '011', '000']);
        expect(result).toEqual('10110');
    });

    it('should return the epsilon based on the gamma', () => {
        const result = BinaryDiagnostic.getEpsilon('00100');
        expect(result).toEqual('11011');
    });

    it('should return decimal value of binary string', () => {
        const result = BinaryDiagnostic.getBinaryDecimal('10110');
        expect(result).toEqual(22);
    });

    it('should return the power consumption from decimal values', () => {
        const result = BinaryDiagnostic.getRating(22, 9);
        expect(result).toEqual(198);
    });

    it('should get the highest occurrence by index', () => {
        const result = BinaryDiagnostic.getHighestOccurrence(['011', '010', '111', '011', '000'], 0);
        expect(result).toEqual('1');
        const result2 = BinaryDiagnostic.getHighestOccurrence(['011', '010', '111', '011', '000'], 1);
        expect(result2).toEqual('0');
        const result3 = BinaryDiagnostic.getHighestOccurrence(['011', '010', '111', '010'], 2);
        expect(result3).toEqual('1');
    });

    it('should filter down to most common', () => {
        const result = BinaryDiagnostic.getOxygenGenerator([
            '00100',
            '11110',
            '10110',
            '10111',
            '10101',
            '01111',
            '00111',
            '11100',
            '10000',
            '11001',
            '00010',
            '01010',
        ]);
        expect(result).toEqual('10111');
    });

    it('should filter down to least common', () => {
        const result = BinaryDiagnostic.getCo2Scrubber([
            '00100',
            '11110',
            '10110',
            '10111',
            '10101',
            '01111',
            '00111',
            '11100',
            '10000',
            '11001',
            '00010',
            '01010',
        ]);
        expect(result).toEqual('01010');
    });
});
