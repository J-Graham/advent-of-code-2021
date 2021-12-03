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
        const result = BinaryDiagnostic.getConsumption(22, 9);
        expect(result).toEqual(198);
    });
});
