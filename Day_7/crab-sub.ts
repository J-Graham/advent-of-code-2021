import FileParser from '../libraries/parse-data';

export default class CrabSub {
    static uniqueCrabs: number[];
    static dups: { [key: number]: number };

    static loadCrabs(crabData: string = ''): number[] {
        return crabData === '' ? FileParser.readFile('./Day_7/model.txt').split(',').map(Number) : crabData.split(',').map(Number);
    }

    static getUniqueList(crabs: number[]): number[] {
        CrabSub.uniqueCrabs = [];
        CrabSub.dups = {};
        crabs.forEach((crab) => {
            if (CrabSub.uniqueCrabs.indexOf(crab) === -1) {
                CrabSub.uniqueCrabs.push(crab);
            } else {
                CrabSub.dups[crab] = (CrabSub.dups[crab] || 0) + 1;
            }
        });
        return CrabSub.uniqueCrabs;
    }

    static getLeastHops(uniqueCrabs: number[]): number {
        let lastHops: number = 0;
        CrabSub.uniqueCrabs = [...new Set(CrabSub.uniqueCrabs.concat(CrabSub.fillRange()))];
        CrabSub.uniqueCrabs.forEach((crab) => {
            let tempHops = 0;
            uniqueCrabs.forEach((crabHop) => {
                if (tempHops > lastHops && lastHops !== 0) {
                    return;
                }
                if (CrabSub.dups[crabHop]) {
                    tempHops += this.countSteps(Math.abs(crabHop - crab)) * CrabSub.dups[crabHop];
                }
                tempHops += this.countSteps(Math.abs(crabHop - crab));
            });
            if (tempHops < lastHops || lastHops === 0) {
                lastHops = tempHops;
            }
        });

        return lastHops;
    }

    static countSteps(steps: number): number {
        const start = 0;
        const end = steps;
        let range: number[] = [];
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range.reduce((a, b) => a + b, 0);
    }

    static fillRange(): number[] {
        const start = Math.min(...CrabSub.uniqueCrabs);
        const end = Math.max(...CrabSub.uniqueCrabs);
        let range: number[] = [];
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    }

    static outputHops(): void {
        CrabSub.loadCrabs();
        console.log(`The least amount of hops is ${CrabSub.getLeastHops(CrabSub.getUniqueList(CrabSub.loadCrabs()))}`);
    }
}

// CrabSub.outputHops();
