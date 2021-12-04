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

    static getConsumption(gamma: number, epsilon: number): number {
        return gamma * epsilon;
    }

    static outputConsumption(): void {
        const binaries = FileParser.parseFile('./Day_3/model.txt');
        const gamma = this.getGamma(this.mapInput(binaries));
        console.log('Consumption', this.getConsumption(this.getBinaryDecimal(gamma), this.getBinaryDecimal(this.getEpsilon(gamma))));
    }
}

BinaryDiagnostic.outputConsumption();
