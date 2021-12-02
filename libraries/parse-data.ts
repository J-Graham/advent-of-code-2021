import * as fs from 'fs';
export function parseFile(file: string): any {
    const data = fs.readFileSync(file, 'utf8');
    return data.split('\n').map(Number);
}
