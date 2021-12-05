import * as fs from 'fs';

export default class FileParser {
    static parseFileToInt(file: string): any {
        const data = fs.readFileSync(file, 'utf8');
        return data.split('\n').map(Number);
    }

    static parseGameBoard(file: string): any {
        return fs.readFileSync('./Day_4/model.txt').toString().trim().split('\n\n');
    }

    static parseFile(file: string): any {
        const data = fs.readFileSync(file, 'utf8');
        return data.split('\n');
    }
}
