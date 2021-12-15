import FileParser from '../libraries/parse-data';

export default class Polymer {
    static elements = {};
    static finalCounts = [];
    static parseStartingPoint(): string {
        const data = FileParser.readFile('./Day_14/test-model.txt').split('\n\n');
        return data[0];
    }

    static parsePairInsertions(): { [key: string]: string } {
        const pairInsertions = Object.create(null);
        FileParser.readFile('./Day_14/model.txt')
            .split('\n\n')[1]
            .split('\n')
            .map((line) => {
                const [pair, insert] = line.split(' -> ');
                pairInsertions[pair] = insert;
            });
        return pairInsertions;
    }

    static parsePairInsertions2(): { [key: string]: string } {
        const pairInsertions = Object.create(null);
        this.elements = {};
        FileParser.readFile('./Day_14/test-model.txt')
            .split('\n\n')[1]
            .split('\n')
            .map((line) => {
                const [pair, insert] = line.split(' -> ');
                pairInsertions[pair] = [pair[0] + insert, insert + pair[1]];

                this.elements[pair] = insert;
            });
        return pairInsertions;
    }
    static fillPair(startingPoint: string, pairs: { [key: string]: string }): string {
        let polymerTemplateChars = startingPoint.split('');
        let foundMatches = 0;
        for (let i = 0; i < polymerTemplateChars.length; i++) {
            const char1 = polymerTemplateChars[i];
            const char2 = polymerTemplateChars[i + 1];
            if (Object.keys(pairs).find((key) => key === char1 + char2)) {
                startingPoint =
                    startingPoint.substring(0, i + foundMatches + 1) +
                    pairs[char1 + char2] +
                    startingPoint.substring(i + foundMatches + 1, startingPoint.length);
                foundMatches++;
            }
        }

        return startingPoint;
    }

    static findDifference(polymer: string): number {
        const counts = {};
        for (let i = 0; i < polymer.length; i++) {
            const char = polymer[i];
            if (!counts[char]) counts[char] = 0;
            counts[char] += 1;
        }
        const mostCommon = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
        const leastCommon = Object.keys(counts).sort((a, b) => counts[a] - counts[b])[0];

        return counts[mostCommon] - counts[leastCommon];
    }

    static findDifferenceObject(polymer: { [key: string]: number }): number {
        const mostCommon = Object.keys(polymer).sort((a, b) => polymer[b] - polymer[a])[0];
        const leastCommon = Object.keys(polymer).sort((a, b) => polymer[a] - polymer[b])[0];

        return polymer[mostCommon] - polymer[leastCommon];
    }

    static getInitialPairCount(startingPoint: string): { [key: string]: number } {
        let counts = {};
        for (let i = 0; i < startingPoint.length - 1; i++) {
            const [char1, char2] = [startingPoint[i], startingPoint[i + 1]];
            counts[char1 + char2]++ || (counts[char1 + char2] = 1);
        }

        return counts;
    }

    static fillPair2(
        initialCounts: { [key: string]: number },
        initialQuantity: { [key: string]: number },
        pairs: { [key: string]: string },
        loops: number,
    ): { [key: string]: number } {
        for (let i = 0; i < loops; i++) {
            const newMatch = [];

            Object.keys(initialCounts).forEach((poly) => {
                const newElementInPoly = this.elements[poly];
                const [first, second] = pairs[poly];

                initialQuantity[newElementInPoly] === undefined
                    ? (initialQuantity[newElementInPoly] = 1)
                    : (initialQuantity[newElementInPoly] += initialCounts[poly]);
                newMatch[first] === undefined ? (newMatch[first] = initialCounts[poly]) : (newMatch[first] += initialCounts[poly]);
                newMatch[second] === undefined ? (newMatch[second] = initialCounts[poly]) : (newMatch[second] += initialCounts[poly]);
            });

            (initialCounts as any) = newMatch;
        }
        return initialQuantity;
    }

    static getInitialQuantity(startingPoint: string): { [key: string]: number } {
        return startingPoint.split('').reduce((final, curr) => {
            final[curr] === undefined ? (final[curr] = 1) : final[curr]++;
            return final;
        }, {});
    }

    static outputDifference(): void {
        const startingPoint = Polymer.parseStartingPoint();
        const pairs = Polymer.parsePairInsertions();
        let fills = Polymer.fillPair(startingPoint, pairs);

        for (let i = 0; i < 9; i++) {
            fills = Polymer.fillPair(fills, pairs);
        }
        let result = Polymer.findDifference(fills);
        console.log('result', result);
    }

    static outputDifference2(): void {
        const startingPoint = Polymer.parseStartingPoint();
        const pairs = Polymer.parsePairInsertions2();
        const initial = Polymer.getInitialPairCount(startingPoint);
        const qty = Polymer.getInitialQuantity(startingPoint);
        const fills = Polymer.fillPair2(initial, qty, pairs, 40);
        let result = Polymer.findDifferenceObject(fills);
        console.log('result', result);
    }
}

Polymer.outputDifference2();
