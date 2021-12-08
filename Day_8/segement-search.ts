import FileParser from '../libraries/parse-data';

// 1 : 2
// 4 : 4
// 7 : 3
// 8 : 7
export default class SegmentSearch {
    static input: string[][];
    static output: string[][];
    static easySegmentCount = [2, 3, 4, 7];
    static mapper = { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' };

    static parseSegment(segment: string = ''): void {
        SegmentSearch.input = [];
        SegmentSearch.output = [];
        segment === ''
            ? FileParser.readFile('./Day_8/model.txt')
                  .split('\n')
                  .map((segs) => {
                      segs.split('|').map((seg, index) => {
                          index === 0 ? SegmentSearch.input.push(seg.trim().split(' ')) : SegmentSearch.output.push(seg.trim().split(' '));
                      });
                  })
            : segment.split('\n').map((segs) => {
                  segs.split('|').map((seg, index) => {
                      index === 0 ? SegmentSearch.input.push(seg.trim().split(' ')) : SegmentSearch.output.push(seg.trim().split(' '));
                  });
              });
    }

    static getEasySegments(): number {
        let easySegmentCount = 0;
        SegmentSearch.output.map((segs) => {
            segs = segs.filter((seg) => {
                return this.easySegmentCount.indexOf(seg.length) !== -1;
            });
            easySegmentCount += segs.length;
        });
        return easySegmentCount;
    }

    static outputSegments(): void {
        SegmentSearch.parseSegment();
        console.log(SegmentSearch.getEasySegments());
    }
}

SegmentSearch.outputSegments();
