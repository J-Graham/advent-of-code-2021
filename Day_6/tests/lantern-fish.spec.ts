import LanternFish from '../lantern-fish';
import VentMapper from '../lantern-fish';

// Will provide an initial comma separated state
// should stop after X iterations
// each iteration decrements the fish by 1
// if the count is 0 restart at 6

// if the count is zero add a new fish at 8
describe('lantern-fish', () => {
    const initialState = '3,4,3,1,2';

    // it('should parse the initial state into an array', () => {
    //     LanternFish.getFishData(initialState);
    //     const result = LanternFish.fishData;
    //     expect(result).toEqual([3, 4, 3, 1, 2]);
    // });

    describe('count-fish', () => {
        beforeEach(() => {
            LanternFish.getFishData(initialState);
        });
        // it('should stop processing fish after 18 days', () => {
        //     spyOn(LanternFish, 'countFish').and.callThrough();
        //     LanternFish.countFish(18);
        //     expect(LanternFish.countFish).toHaveBeenCalledTimes(18);
        // });

        it('should decrement the fish count by 1 for each count', () => {
            LanternFish.countFish(1);
            expect(LanternFish.fishData).toEqual({ 0: 1, 1: 1, 2: 2, 3: 1, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
        });
    });

    it('should add a new fish at 8 count when it decrementing to negative', () => {
        LanternFish.getFishData(initialState);
        LanternFish.countFish(3);
        expect(LanternFish.fishData).toEqual({ 0: 2, 1: 1, 2: 0, 3: 0, 4: 0, 5: 1, 6: 1, 7: 1, 8: 1 });
    });

    // create an object whose key is the current spawn day
    // increment based on what is at the 0 key
    it('should return a list of objects with keys for 0 thru 8', () => {
        LanternFish.getFishData(initialState);
        expect(LanternFish.fishData).toEqual({ 0: 0, 1: 1, 2: 1, 3: 2, 4: 1, 5: 0, 6: 0, 7: 0, 8: 0 });
    });

    it('should return a sum of all the fish', () => {
        LanternFish.getFishData(initialState);
        LanternFish.countFish(3);
        expect(LanternFish.sumFish(LanternFish.fishData)).toEqual(7);
    });
});
