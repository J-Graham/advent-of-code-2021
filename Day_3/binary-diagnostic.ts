import FileParser from '../libraries/parse-data';

export default class BinaryDiagnostic {
    // gamma bit is most common bits in each row
    // epsilon is the least common bits

    static mapInput(binaryNumbers: string[]): string[] {
        const mappedBinaries = [];
        binaryNumbers.map((binaryNumber) => {
            for (let i = 0; i < binaryNumber.length; i++) {
                mappedBinaries[i] ? (mappedBinaries[i] += binaryNumber[i]) : (mappedBinaries[i] = binaryNumber[i]);
            }
        });
        return mappedBinaries;
    }

    static getOxygenGenerator(binaries: string[], index = 0): string {
        if (binaries.length === 1) {
            return binaries[0];
        }
        let mappedBinaries = this.mapInput(binaries);
        let highestOccurrence = this.getHighestOccurrence(mappedBinaries, index);
        binaries = binaries.filter((bit) => bit[index] === highestOccurrence);
        index++;
        return this.getOxygenGenerator(binaries, index);
    }

    static getHighestOccurrence(mappedBinaries: string[], index: number): string {
        const curr = mappedBinaries[index];
        let { oneCount, zeroCount } = BinaryDiagnostic.getCounts(curr);
        if (oneCount === zeroCount) {
            return '1';
        } else if (oneCount > zeroCount) {
            return '1';
        } else {
            return '0';
        }
    }

    private static getCounts(curr: string) {
        let oneCount = curr.split('').filter((bit) => bit === '1').length;
        let zeroCount = curr.split('').filter((bit) => bit === '0').length;
        return { oneCount, zeroCount };
    }

    static getCo2Scrubber(binaries: string[], index = 0): string {
        if (binaries.length === 1) {
            return binaries[0];
        }
        let mappedBinaries = this.mapInput(binaries);
        let lowestOccurrence = this.getLowestOccurrence(mappedBinaries, index);
        binaries = binaries.filter((bit) => bit[index] === lowestOccurrence);
        index++;
        return this.getCo2Scrubber(binaries, index);
    }

    static getLowestOccurrence(mappedBinaries: string[], index: number): string {
        const curr = mappedBinaries[index];
        let { oneCount, zeroCount } = BinaryDiagnostic.getCounts(curr);
        if (oneCount === zeroCount) {
            return '0';
        } else if (oneCount > zeroCount) {
            return '0';
        } else {
            return '1';
        }
    }

    static getGamma(mappedBinaries: string[]): string {
        let highestOccurance = '';
        for (let i = 0; i < mappedBinaries.length; i++) {
            const curr = mappedBinaries[i];
            let oneCount = curr.split('').filter((bit) => bit === '1').length;
            let zeroCount = curr.split('').filter((bit) => bit === '0').length;
            if (oneCount > zeroCount) {
                highestOccurance += '1';
            } else {
                highestOccurance += '0';
            }
        }
        return highestOccurance;
    }

    static getEpsilon(gamma: string): string {
        let epsilon = '';
        for (let i = 0; i < gamma.length; i++) {
            if (gamma[i] === '1') {
                epsilon += '0';
            } else {
                epsilon += '1';
            }
        }
        return epsilon;
    }

    static getBinaryDecimal(binaryNumber: string): number {
        return parseInt(binaryNumber, 2);
    }

    static getRating(rating1: number, rating2: number): number {
        return rating1 * rating2;
    }

    static outputConsumption(): void {
        const binaries = FileParser.parseFile('./Day_3/model.txt');
        const gamma = this.getGamma(this.mapInput(binaries));
        console.log('Consumption', this.getRating(this.getBinaryDecimal(gamma), this.getBinaryDecimal(this.getEpsilon(gamma))));
    }

    static outputLifeSupport(): void {
        const binaries = FileParser.parseFile('./Day_3/model.txt');
        const oxygen = this.getOxygenGenerator(binaries);
        const co2 = this.getCo2Scrubber(binaries);

        console.log('Life Support: ', this.getRating(this.getBinaryDecimal(oxygen), this.getBinaryDecimal(co2)));
    }
}

BinaryDiagnostic.outputLifeSupport();
