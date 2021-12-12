import FileParser from '../libraries/parse-data';

export default class Passage {
    static paths: string[][];
    static adjacentMoves = Object.create(null);
    static parseInput(): void {
        this.paths = [];
        FileParser.readFile('./Day_12/test-model.txt')
            .split('\n')
            .map((line) => {
                const path: string[] = line.split('-');
                this.addMapping(path[0], path[1]);
                this.addMapping(path[1], path[0]);
            });
    }
    static addMapping(from, to) {
        if (!Object.keys(this.adjacentMoves).includes(from)) this.adjacentMoves[from] = { adjacent: [] };
        this.adjacentMoves[from].adjacent.push(to);
    }
    // function that begins at start and returns all the paths to end
    static findPaths(start: string): number {
        let pathMoves = 0;
        let queue: string[][] = [[start]];
        while (queue.length > 0) {
            const paths: string[] = queue.pop();
            for (let adj of this.adjacentMoves[paths[paths.length - 1]].adjacent) {
                if (adj == 'end') {
                    pathMoves += 1;
                } else if (adj.toLowerCase() == adj) {
                    if (paths.indexOf(adj) == -1) queue.push([...paths, adj]);
                } else {
                    queue.push([...paths, adj]);
                }
            }
        }
        return pathMoves;
    }

    static outputPaths(): void {
        Passage.parseInput();
        const paths = Passage.findPaths('start');
        console.log('paths', paths);
    }
}
Passage.outputPaths();
