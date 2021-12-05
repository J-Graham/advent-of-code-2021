import FileParser from '../libraries/parse-data';
import * as fs from 'fs';

export interface CardSection {
    value: number;
    x: number;
    y: number;
    selected: boolean;
}
export default class Bingo {
    static data = FileParser.parseGameBoard('./Day_4/data.txt');

    static numbersToDraw = Bingo.data[0]
        .trim()
        .split(',')
        .map((x) => parseInt(x));

    static boards = Bingo.data.slice(1).map(Bingo.parseRowArrays).map(Bingo.createBoardObject);

    static scores = [];
    static outputScore() {
        for (let i = 5; this.scores.length == 0; i++) {
            const drawnNumbers = Bingo.numbersToDraw.slice(0, i + 1);
            this.scores = this.boards
                .filter((board) => this.isBoardComplete(board, drawnNumbers))
                .map((x) => this.computeScore(x, drawnNumbers))
                .sort()
                .reverse();
        }
        console.log(this.scores[0]);
    }

    static parseRowArrays(data) {
        return data.split('\n').map((row) =>
            row
                .trim()
                .split(/\s+/g)
                .map((x) => parseInt(x)),
        );
    }
    static createBoardObject(rows) {
        return {
            rows,
            cols: rows[0].map((_, i) => rows.map((row) => row[i])),
        };
    }

    static areAllElementsInDrawnNumbers(elementArr, drawnNumbers) {
        return elementArr.every((element) => drawnNumbers.includes(element));
    }
    static isBoardComplete(board, drawnNumbers) {
        const matchingRows = board.rows.some((row) => this.areAllElementsInDrawnNumbers(row, drawnNumbers));
        const matchingCols = board.cols.some((col) => this.areAllElementsInDrawnNumbers(col, drawnNumbers));
        return matchingCols || matchingRows;
    }

    static computeScore(board, drawnNumbers) {
        return (
            board.rows
                .flatMap((row) => row)
                .filter((element) => !drawnNumbers.includes(element))
                .reduce((a, b) => a + b) * drawnNumbers[drawnNumbers.length - 1]
        );
    }
}

Bingo.outputScore();
