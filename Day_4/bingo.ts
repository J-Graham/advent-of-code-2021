import FileParser from '../libraries/parse-data';

export default class Bingo {
    static data = FileParser.parseGameBoard('./Day_4/data.txt');

    static numbersToDraw = Bingo.data[0]
        .trim()
        .split(',')
        .map((x) => parseInt(x));

    static boards = Bingo.data.slice(1).map(Bingo.parseRowArrays).map(Bingo.createBoardObject);
    static boardsComplete = [];
    static scores = [];
    static outputScore() {
        for (let i = 5; this.scores.length == 0; i++) {
            const drawnNumbers = Bingo.numbersToDraw.slice(0, i + 1);
            this.scores = this.boards
                .filter((board) => this.isBoardComplete(board, drawnNumbers) && Bingo.boardsComplete.length === Bingo.boards.length)
                .map((x) => this.computeScore(x, drawnNumbers));
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
        if (matchingRows || matchingCols) {
            if (this.isBoardAlreadyAdded(board)) {
                Bingo.boardsComplete.push(board);
            }
        }
        return matchingCols || matchingRows;
    }
    static isBoardAlreadyAdded(boardToAdd: []): boolean {
        let itemsFound = {};
        let addBoard = true;
        for (let i = 0, l = Bingo.boardsComplete.length; i < l; i++) {
            if (JSON.stringify(boardToAdd) === JSON.stringify(Bingo.boardsComplete[i])) {
                addBoard = false;
            }
        }
        return addBoard;
    }

    static computeScore(board, drawnNumbers) {
        return (
            Bingo.boardsComplete[Bingo.boardsComplete.length - 1].rows
                .flatMap((row) => row)
                .filter((element) => !drawnNumbers.includes(element))
                .reduce((a, b) => a + b) * drawnNumbers[drawnNumbers.length - 1]
        );
    }
}

// Bingo.outputScore();
