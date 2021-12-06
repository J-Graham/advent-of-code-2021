import FileParser from '../libraries/parse-data';

export default class LanternFish {
    static fishData: number[];
    static fishToAdd = 0;

    static getFishData(initialState: string = ''): void {
        LanternFish.fishData =
            initialState === '' ? FileParser.readFile('./Day_6/model.txt').split(',').map(Number) : initialState.split(',').map(Number);
    }

    static countFish(days: number, count = 1): void {
        if (days === 1 || count === days) {
            LanternFish.decrementCount();
        } else {
            count++;
            LanternFish.decrementCount();
            this.countFish(days, count);
        }
    }

    private static decrementCount() {
        for (let i = 0; i < LanternFish.fishData.length; i++) {
            const spawnDay = LanternFish.fishData[i];
            if (spawnDay === 0) {
                LanternFish.fishData.push(9);
                LanternFish.fishData[i] = 6;
            } else {
                LanternFish.fishData[i] = spawnDay - 1;
            }
        }
    }

    static outputSpawn(days: number): void {
        LanternFish.getFishData();
        LanternFish.countFish(days);
        console.log(`After ${days} days, the fish population is ${LanternFish.fishData.length}`);
    }
}

LanternFish.outputSpawn(80);
