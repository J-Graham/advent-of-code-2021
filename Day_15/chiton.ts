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
        const chitonPositions = FileParser.readFile('./Day_15/model.txt')
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

    static mapChitons(): {} {
        const chitonGraph = this.parseChitonPositions();
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
        }

        return to.pathRisk;
    }

    static findShortestPath(graph) {
        // track distances from the start node using a hash object

        // track paths using a hash object

        // collect visited nodes

        // find the nearest node
        graph[0][0].pathRisk = 0;
        let nodeQueue = [graph[0][0]];

        const end = graph[graph.length - 1][graph.length - 1];
        // for that node:
        let count = 0;
        while (nodeQueue.length > 0) {
            if (end.visited) {
                break;
            }

            const currentNode = nodeQueue.shift();
            if (currentNode.visited) {
                continue;
            }

            if (currentNode.up && !currentNode.up.visited) {
                currentNode.up.pathRisk = this.shortestDistanceNode(currentNode, currentNode.up);
                nodeQueue.push(currentNode.up);
            }
            if (currentNode.down) {
                currentNode.down.pathRisk = this.shortestDistanceNode(currentNode, currentNode.down);
                nodeQueue.push(currentNode.down);
            }
            if (currentNode.right) {
                currentNode.right.pathRisk = this.shortestDistanceNode(currentNode, currentNode.right);
                nodeQueue.push(currentNode.right);
            }
            if (currentNode.left) {
                currentNode.left.pathRisk = this.shortestDistanceNode(currentNode, currentNode.left);
                nodeQueue.push(currentNode.left);
            }
            count++;
            currentNode.visited = true;
        }
        // when the end node is reached, reverse the recorded path back to the start node
        return end;
    }

    static outputShortestPath(): void {
        const graph = this.mapChitons();
        const results = this.findShortestPath(graph);
        console.log('Path Risk: ', results.pathRisk);
    }
}
// Chiton.mapChitons();
// Chiton.parseChitonPositions();
Chiton.outputShortestPath();
