import FileParser from '../libraries/parse-data';

// 1 : 2
// 4 : 4
// 7 : 3
// 8 : 7
export default class SegmentSearch {
    static input: string[][];
    static output: string[][];
    static easySegmentCount = [2, 3, 4, 7];
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
        SegmentSearch.digits = { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
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

    static parseNine(segment: string[]): void {
        segment
            .filter((seg) => {
                return seg.length === 6;
            })
            .map((seg) => {
                seg = seg.split('').sort().join('');
                const segSplit = seg.split('');
                if (SegmentSearch.digits[4].split('').every((seg) => segSplit.includes(seg))) {
                    SegmentSearch.digits[9] = seg;
                }
            });
    }

    static parseTwo(segment: string[]): void {
        segment
            .filter((seg) => {
                return seg.length === 5;
            })
            .map((seg) => {
                seg = seg.split('').sort().join('');
                const segSplit = seg.split('');
                if (!segSplit.every((seg) => SegmentSearch.digits[9].split('').includes(seg))) {
                    SegmentSearch.digits[2] = seg;
                }
            });
    }

    static parseThree(segment: string[]): void {
        segment
            .filter((seg) => {
                return seg.length === 5;
            })
            .map((seg) => {
                seg = seg.split('').sort().join('');
                const segSplit = seg.split('');
                let differentLetters = 0;
                SegmentSearch.digits[2].split('').forEach((seg2) => {
                    if (segSplit.indexOf(seg2) === -1) {
                        differentLetters++;
                    }
                });
                if (differentLetters === 1) {
                    SegmentSearch.digits[3] = seg;
                }
            });
    }

    static parseFive(segment: string[]): void {
        segment
            .filter((seg) => {
                return seg.length === 5;
            })
            .map((seg) => {
                seg = seg.split('').sort().join('');
                if (seg !== SegmentSearch.digits[3] && seg !== SegmentSearch.digits[2]) {
                    SegmentSearch.digits[5] = seg;
                }
            });
    }
    static parseSixAndZero(segment: string[]): void {
        segment
            .filter((seg) => {
                return seg.length === 6;
            })
            .map((seg) => {
                seg = seg.split('').sort().join('');
                const segSplit = seg.split('');
                if (SegmentSearch.digits[7].split('').every((seg) => segSplit.includes(seg)) && seg !== SegmentSearch.digits[9]) {
                    SegmentSearch.digits[0] = seg;
                } else if (seg !== SegmentSearch.digits[0] && seg !== SegmentSearch.digits[9]) {
                    SegmentSearch.digits[6] = seg;
                }
            });
    }

    private static sameLetters(str1, str2) {
        if (str1.length !== str2.length) return false;

        const obj1 = {};
        const obj2 = {};

        for (const letter of str1) {
            obj1[letter] = (obj1[letter] || 1) + 1;
        }
        for (const letter of str2) {
            obj2[letter] = (obj2[letter] || 1) + 1;
        }

        for (const key in obj1) {
            if (!obj2.hasOwnProperty(key)) return false;
            if (obj1[key] !== obj2[key]) return false;
        }
        return true;
    }

    static outputDecoded(): void {
        this.parseSegment();
        let decodeSum = 0;
        this.input.forEach((segs, index) => {
            SegmentSearch.getKnowns(segs);
            SegmentSearch.parseNine(segs);
            SegmentSearch.parseTwo(segs);
            SegmentSearch.parseThree(segs);
            SegmentSearch.parseFive(segs);
            SegmentSearch.parseSixAndZero(segs);
            let ouptutParsed = '';
            this.output[index].forEach((code) => {
                Object.keys(SegmentSearch.digits).forEach((key) => {
                    if (this.sameLetters(code, SegmentSearch.digits[key])) {
                        ouptutParsed += key.toString();
                    }
                });
            });
            decodeSum += parseInt(ouptutParsed);
            console.log('decodeSum', decodeSum);
        });
    }
    static outputSegments(): void {
        SegmentSearch.parseSegment();
        console.log(SegmentSearch.getEasySegments());
    }
}

// SegmentSearch.outputDecoded();
