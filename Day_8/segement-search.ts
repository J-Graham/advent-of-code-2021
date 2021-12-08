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
    static digits = { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };

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

    static getKnowns(segment: string[]): void {
        segment = segment.map((seg) => {
            return seg.split('').sort().join('');
        });
        segment.forEach((seg) => {
            if (seg.length === 2) {
                SegmentSearch.digits[1] = seg;
            } else if (seg.length === 4) {
                SegmentSearch.digits[4] = seg;
            } else if (seg.length === 3) {
                SegmentSearch.digits[7] = seg;
            } else if (seg.length === 7) {
                SegmentSearch.digits[8] = seg;
            }
        });
        // can take them out here if it's slow
    }

    static parseZero(segment: string[]): void {
        segment
            .filter((seg) => {
                return seg.length === 6;
            })
            .map((seg) => {
                seg = seg.split('').sort().join('');
                const segSplit = seg.split('');
                if (
                    SegmentSearch.digits[4].split('').every((seg) => segSplit.includes(seg)) &&
                    SegmentSearch.digits[1].split('').every((seg) => segSplit.includes(seg))
                ) {
                    SegmentSearch.digits[0] = seg;
                }
            });
    }

    static outputSegments(): void {
        SegmentSearch.parseSegment();
        console.log(SegmentSearch.getEasySegments());
    }
}

// SegmentSearch.outputSegments();
