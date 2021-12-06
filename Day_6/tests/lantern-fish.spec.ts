import LanternFish from '../lantern-fish';
import VentMapper from '../lantern-fish';

// Will provide an initial comma separated state
// should stop after X iterations
// each iteration decrements the fish by 1
// if the count is 0 restart at 6

// if the count is zero add a new fish at 8
describe('lantern-fish', () => {
    const initialState = '3,4,3,1,2';

    it('should parse the initial state into an array', () => {
        LanternFish.getFishData(initialState);
        const result = LanternFish.fishData;
        expect(result).toEqual([3, 4, 3, 1, 2]);
    });

    describe('count-fish', () => {
        beforeEach(() => {
            LanternFish.getFishData(initialState);
        });
        it('should stop processing fish after 18 days', () => {
            spyOn(LanternFish, 'countFish').and.callThrough();
            LanternFish.countFish(18);
            expect(LanternFish.countFish).toHaveBeenCalledTimes(18);
        });

        it('should decrement the fish count by 1 for each count', () => {
            LanternFish.countFish(1);
            expect(LanternFish.fishData).toEqual([2, 3, 2, 0, 1]);
        });
    });

    it('should add a new fish at 8 count when it decrementing to negative', () => {
        LanternFish.getFishData(initialState);
        LanternFish.countFish(3);
        expect(LanternFish.fishData).toEqual([0, 1, 0, 5, 6, 7, 8]);
    });
});
