import FileParser from '../libraries/parse-data';

interface ChitonNode {
    risk: number;
    pathRisk: number;
    visited: boolean;
    up: ChitonNode | null;
    down: ChitonNode | null;
    left: ChitonNode | null;
    right: ChitonNode | null;
}
export default class Chiton {
    static parseChitonPositions(): ChitonNode[][] {
        const chitonPositions = FileParser.readFile('./Day_15/test-model.txt')
            .split('\n')
            .map((line) =>
                line
                    .split('')
                    .map(Number)
                    .map((line) => {
                        return {
                            risk: line,
                            pathRisk: Infinity,
                            visited: false,
                            up: null,
                            down: null,
                            left: null,
                            right: null,
                        };
                    }),
            );

        return chitonPositions;
    }

    static multiplyMap() {
        let chitonMap = FileParser.readFile('./Day_15/model.txt')
            .split('\n')
            .map((line) => line.split('').map(Number));

        const rowsToAdd = [];
        const fullMap = [];
        for (let y = 0; y < chitonMap.length * 5; y++) {
            if (y > chitonMap.length - 1) {
                const row = [];
                for (let x = 0; x < rowsToAdd[y - chitonMap.length].length; x++) {
                    if (rowsToAdd[y - chitonMap.length][x] + 1 > 9) {
                        row.push(1);
                    } else {
                        row.push(rowsToAdd[y - chitonMap.length][x] + 1);
                    }
                }
                rowsToAdd.push(row);
            } else {
                rowsToAdd.push(chitonMap[y]);
            }
        }

        for (let y = 0; y < rowsToAdd.length; y++) {
            const row = [];

            for (let x = 0; x < rowsToAdd[y].length * 5; x++) {
                if (x > rowsToAdd[y].length - 1) {
                    row.push(row[x - rowsToAdd[y].length] + 1 > 9 ? 1 : row[x - rowsToAdd[y].length] + 1);
                } else {
                    row.push(rowsToAdd[y][x]);
                }
            }

            fullMap.push(row);
        }

        return fullMap.map((line) => {
            return line.map((item) => {
                return {
                    risk: item,
                    pathRisk: Infinity,
                    visited: false,
                    up: null,
                    down: null,
                    left: null,
                    right: null,
                    previous: null,
                };
            });
        });
    }

    static mapChitons(chitonGraph): {} {
        // loop to map neighbors to object
        for (let y = 0; y < chitonGraph.length; y++) {
            for (let x = 0; x < chitonGraph[y].length; x++) {
                const chiton = chitonGraph[y][x];
                y > 0 ? (chiton.up = chitonGraph[y - 1][x]) : null;
                y < chitonGraph.length - 1 ? (chiton.down = chitonGraph[y + 1][x]) : null;
                x > 0 ? (chiton.left = chitonGraph[y][x - 1]) : null;
                x < chitonGraph[y].length - 1 ? (chiton.right = chitonGraph[y][x + 1]) : null;
            }
        }
        return chitonGraph;
    }

    static shortestDistanceNode(from, to) {
        // create a default value for shortest
        const newRisk = from.pathRisk + to.risk;
        if (newRisk < to.pathRisk) {
            to.pathRisk = newRisk;
            to.previous = from;
        }

        return [to.pathRisk, to.previous];
    }

    static getNext(nodeQueue) {
        let next = null;
        for (const node of nodeQueue) {
            if (next === null || (node as any).pathRisk < next.pathRisk) {
                next = node;
            }
        }
        return next;
    }

    static findShortestPath(graph) {
        // track distances from the start node using a hash object

        // track paths using a hash object

        // collect visited nodes
        // find the nearest node
        graph[0][0].pathRisk = 0;
        const nodeQueue = new Set();
        nodeQueue.add(graph[0][0]);

        const end = graph[graph.length - 1][graph.length - 1];

        // for that node:
        while (nodeQueue.size > 0) {
            if (end.visited) {
                break;
            }

            const currentNode = this.getNext(nodeQueue);

            if (currentNode.up && !currentNode.up.visited) {
                [currentNode.up.pathRisk, currentNode.up.previous] = this.shortestDistanceNode(currentNode, currentNode.up);
                nodeQueue.add(currentNode.up);
            }
            if (currentNode.down) {
                [currentNode.down.pathRisk, currentNode.down.previous] = this.shortestDistanceNode(currentNode, currentNode.down);

                nodeQueue.add(currentNode.down);
            }
            if (currentNode.right && !currentNode.right.visited) {
                [currentNode.right.pathRisk, currentNode.right.previous] = this.shortestDistanceNode(currentNode, currentNode.right);
                nodeQueue.add(currentNode.right);
            }
            if (currentNode.left && !currentNode.left.visited) {
                [currentNode.left.pathRisk, currentNode.left.previous] = this.shortestDistanceNode(currentNode, currentNode.left);
                nodeQueue.add(currentNode.left);
            }
            currentNode.visited = true;
            nodeQueue.delete(currentNode);
        }
        // when the end node is reached, reverse the recorded path back to the start node
        return end;
    }

    static outputShortestPath(): void {
        const positions = this.parseChitonPositions();
        const graph = this.mapChitons(positions);
        const results = this.findShortestPath(graph);
        console.log('Path Risk: ', results.pathRisk);
    }

    static outputShortestPathPart2(): void {
        const positions = this.multiplyMap();
        const graph = this.mapChitons(positions);
        const results = this.findShortestPath(graph);
        console.log('Path Risk: ', results.pathRisk);
    }
}
// Chiton.mapChitons();
// Chiton.parseChitonPositions();
// Chiton.outputShortestPath();
// Chiton.multiplyMap();
Chiton.outputShortestPathPart2();
