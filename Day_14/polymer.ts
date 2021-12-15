import { start } from 'repl';
import FileParser from '../libraries/parse-data';

export default class Polymer {
    static parseStartingPoint(): string {
        const data = FileParser.readFile('./Day_14/test-model.txt').split('\r\n\r\n');
        return data[0];
    }

    static parsePairInsertions(): { [key: string]: string } {
        const pairInsertions = Object.create(null);
        FileParser.readFile('./Day_14/test-model.txt')
            .split('\r\n\r\n')[1]
            .split('\r\n')
            .map((line) => {
                const [pair, insert] = line.split(' -> ');
                pairInsertions[pair] = insert;
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

    static outputDifference(): void {
        const startingPoint = Polymer.parseStartingPoint();
        const pairs = Polymer.parsePairInsertions();
        let fills = Polymer.fillPair(startingPoint, pairs);

        for (let i = 0; i < 39; i++) {
            fills = Polymer.fillPair(fills, pairs);
            console.log(fills.length);
        }
        let result = Polymer.findDifference(fills);
        console.log('result', result);
    }
}

// Polymer.outputDifference();
