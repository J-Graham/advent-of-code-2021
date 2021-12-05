import VentMapper from '../vent-mapper';

describe('vent-mapper', () => {
    const mockPlots = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

    const mockCords = [
        [
            [0, 9],
            [5, 9],
        ],
        [
            [8, 0],
            [0, 8],
        ],
        [
            [9, 4],
            [3, 4],
        ],
        [
            [2, 2],
            [2, 1],
        ],
        [
            [7, 0],
            [7, 4],
        ],
        [
            [6, 4],
            [2, 0],
        ],
        [
            [0, 9],
            [2, 9],
        ],
        [
            [3, 4],
            [1, 4],
        ],
        [
            [0, 0],
            [8, 8],
        ],
        [
            [5, 5],
            [8, 2],
        ],
    ];
    const mockMap = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const emptyMap = JSON.parse(JSON.stringify(mockMap));
    const mockFilledMap = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 2],
        [0, 1, 1, 0, 1, 0, 0, 0, 0, 2],
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    ];
    const mockLines = [
        [
            [0, 9],
            [5, 9],
        ],
        [
            [9, 4],
            [3, 4],
        ],
        [
            [2, 2],
            [2, 1],
        ],
        [
            [7, 0],
            [7, 4],
        ],
        [
            [0, 9],
            [2, 9],
        ],
        [
            [3, 4],
            [1, 4],
        ],
    ];
    it('should parse the coords to array', () => {
        const result = VentMapper.parseCoords(mockPlots);
        expect(result).toEqual(mockCords);
    });

    it('should return vertical and horizontal lines', () => {
        const result = VentMapper.getLines(mockCords);
        expect(result).toEqual(mockLines);
    });

    it('should return the max value in the coord', () => {
        const result = VentMapper.getMaxValue(mockCords);
        expect(result).toEqual(9);
    });
    it('should return map of all coords', () => {
        const mockMaxValue = 9;
        expect(VentMapper.getMap(mockMaxValue)).toEqual(emptyMap);
    });
    it('should parse the start of a line', () => {
        const result = VentMapper.getStart(mockCords[0]);
        expect(result).toEqual([0, 9]);
    });

    it('should parse the end of a line', () => {
        const result = VentMapper.getEnd(mockCords[0]);
        expect(result).toEqual([5, 9]);
    });

    it('should mark the board based on map', () => {
        const result = VentMapper.markMap(mockLines, mockMap);
        expect(result).toEqual(mockFilledMap);
    });

    it('should return a count of all the cords with more then 1', () => {
        const result = VentMapper.getCountCordsMoreThanOne(mockFilledMap);
        expect(result).toEqual(5);
    });
});
