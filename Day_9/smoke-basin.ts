import FileParser from '../libraries/parse-data';

export default class SmokeBasin {
    static smokeBasin: number[][] = [];

    static parseSmokeBasin(input: string = ''): void {
        // SmokeBasin.smokeBasin =
        const parsedBasin = [];
        if (input === '') {
            SmokeBasin.smokeBasin = FileParser.readFile('./Day_9/test-model.txt')
                .split('\n')
                .map((row) => {
                    parsedBasin.push(row.toString().trim().split('').map(Number));
                });
        } else {
            input.split('\n').map((row) => {
                parsedBasin.push(row.toString().trim().split('').map(Number));
            });
        }
        this.smokeBasin = parsedBasin;
    }
}
