import FileParser from '../libraries/parse-data';

interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
}

export class Stack<T> implements IStack<T> {
    private storage: T[] = [];

    constructor(private capacity: number = Infinity) {}

    push(item: T): void {
        if (this.size() === this.capacity) {
            throw Error('Stack has reached max capacity, you cannot add more items');
        }
        this.storage.push(item);
    }

    pop(): T | undefined {
        return this.storage.pop();
    }

    peek(): T | undefined {
        return this.storage[this.size() - 1];
    }

    size(): number {
        return this.storage.length;
    }
}

export default class SyntaxScoring {
    static chunks: string[];
    static pointsMap: Map<string, number> = new Map<string, number>([
        [')', 3],
        [']', 57],
        ['}', 1197],
        ['>', 25137],
    ]);
    static parseChunks(): void {
        this.chunks = FileParser.readFile('./Day_10/model.txt').split('\n');
    }

    static findFirstIllegalChars(): string[] {
        let illegalChars: string[] = [];

        this.chunks.forEach((chunk: string, index) => {
            const stack = new Stack<string>();

            const chunkChars = chunk.split('');

            for (let i = 0; i < chunkChars.length; i++) {
                const char = chunkChars[i];
                if (char === '(' || char === '{' || char === '[' || char === '<') {
                    stack.push(char);
                } else if (char === ')' || char === '}' || char === ']' || char === '>') {
                    if (this.isClosingChar(char, stack)) {
                        stack.pop();
                    } else {
                        illegalChars.push(char);
                        break;
                    }
                }
            }
        });
        return illegalChars;
    }

    static isClosingChar(char: string, stack: Stack<string>): boolean {
        let isClosingChar = false;
        if (char === ')' && stack.peek() === '(') {
            isClosingChar = true;
        }
        if (char === '}' && stack.peek() === '{') {
            isClosingChar = true;
        }
        if (char === ']' && stack.peek() === '[') {
            isClosingChar = true;
        }
        if (char === '>' && stack.peek() === '<') {
            isClosingChar = true;
        }
        return isClosingChar;
    }

    static outputErrorScore(): void {
        this.parseChunks();
        const illegalChars = this.findFirstIllegalChars();
        const score = illegalChars.reduce((acc, char) => {
            return acc + this.pointsMap.get(char);
        }, 0);
        console.log(score);
    }
}
SyntaxScoring.outputErrorScore();
