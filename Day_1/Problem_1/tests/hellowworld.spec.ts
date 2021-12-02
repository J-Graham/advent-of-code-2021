import { helloworld } from '../helloworld';

describe('helloworld', () => {
    it('should return helloworld', () => {
        const result = helloworld();
        expect(result).toBe('helloworld');
    });
});
