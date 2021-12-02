import * as fs from 'fs';

export default class FileParser {
    static parseFile(file: string): any {
        const data = fs.readFileSync(file, 'utf8');
        return data.split('\n').map(Number);
    }
}
