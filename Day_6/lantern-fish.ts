import FileParser from '../libraries/parse-data';

export default class LanternFish {
    static fishData: { [key: number]: number } = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
    static fishToAdd = 0;

    static reinitializeFishData(): void {
        LanternFish.fishData = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
    }

    static getFishData(initialState: string = ''): void {
        this.reinitializeFishData();
        initialState === ''
            ? FileParser.readFile('./Day_6/model.txt')
                  .split(',')
                  .map(Number)
                  .map((spawnDay) => {
                      if (spawnDay) {
                          LanternFish.fishData[spawnDay]++;
                      }
                  })
            : initialState.split(',').map((spawnDay) => {
                  if (spawnDay) {
                      LanternFish.fishData[spawnDay]++;
                  }
              });
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
        const newFish = LanternFish.fishData[0];
        Object.keys(LanternFish.fishData).map((fishCount, index) => {
            if (index === 8) {
                LanternFish.fishData[index] = newFish;
            } else if (index === 6) {
                LanternFish.fishData[index] = LanternFish.fishData[index + 1] + newFish;
            } else {
                LanternFish.fishData[index] = LanternFish.fishData[index + 1];
            }
        });
    }

    static outputSpawn(days: number): void {
        LanternFish.getFishData();
        LanternFish.countFish(days);
        console.log(`After ${days} days, the fish population is ${this.sumFish(LanternFish.fishData)}`);
    }

    // function that loops over objects keys and sums the values
    static sumFish(obj: { [key: number]: number }): number {
        return Object.keys(obj).reduce((a, b) => {
            return a + obj[b];
        }, 0);
    }
}

// LanternFish.outputSpawn(256);
