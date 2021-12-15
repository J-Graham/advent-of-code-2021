import FileParser from '../libraries/parse-data';

export default class Chiton {
    static parseInput(): number[][] {
        const data = FileParser.readFile('./Day_15/test-model.txt').split('\r\n');
        return data.map((line) => line.split('').map((num) => Number(num)));
    }
}
