// Bikram Sambat (Nepal's official calendar) ⇄ Gregorian.
//
// Nepali month lengths (29–32 days) follow the published calendar, not a
// formula. This table is the day-by-day agreement of six open-source
// libraries (MIT / Apache-2.0: @inicrea/bikram-sambat-core, nepali-date-library,
// nepali-date-converter, bikram-sambat-js, @sbmdkl/nepali-date-converter,
// nepali-date), taken month by month where they differ. Years beyond the
// calendar Nepal has published are projections in every source.

export const MIN_BS_YEAR = 2000;
/** BS 2000/01/01 = 1943-04-14 (AD). */
const EPOCH = Date.UTC(1943, 3, 14);
const DAY = 86_400_000;

/** One string per year from BS 2000: each digit is that month's length minus 29. */
const LEN = [
  '132321110102', '223222101011', '223321101011', '232321110012', '132321110102', '223222101011', '223321101011', '232321110012', '222322011002', '223222101011',
  '223321101011', '232321110012', '222322011011', '223222101011', '223321101011', '232321110012', '222322011011', '223222101011', '232321101011', '232321110102',
  '222322101011', '223222101011', '232321110011', '232321110102', '222322101011', '223222101011', '232321110012', '132321110102', '223222101011', '223231101011',
  '232321110012', '132321110102', '223222101011', '223321101011', '232321110012', '132322011002', '223222101011', '223321101011', '232321110012', '222322011011',
  '223222101011', '223321101011', '232321110012', '222322011011', '223222101011', '232321101011', '232321110012', '222322101011', '223222101011', '232321110011',
  '232321110102', '222322101011', '223222101011', '232321110011', '232321110102', '223222101011', '223231101011', '232321110012', '132321110102', '223222101011',
  '223321101011', '232321110012', '132322010102', '223222101011', '223321101011', '232321110012', '222322011002', '223222101011', '223321101011', '232321110012',
  '222322011011', '223222101011', '232321101011', '232321110012', '222322101011', '223222101011', '232321110011', '232321110102', '222322101011', '223222101011',
  '232321110011', '232321110102', '223222101011', '223222101011', '223221110111', '232312110111', '132321110111', '223222110111', '123312110111', '132321110111',
  '132321110111',
];
export const MAX_BS_YEAR = MIN_BS_YEAR + LEN.length - 1;

export const BS_MONTHS_EN = ['Baisakh', 'Jestha', 'Asar', 'Shrawan', 'Bhadra', 'Asoj', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
export const BS_MONTHS_NE = ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पुस', 'माघ', 'फागुन', 'चैत'];
export const WEEKDAYS_NE = ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'];

export interface BsDate { y: number; m: number; d: number }

export function bsMonthLength(y: number, m: number): number {
  const row = LEN[y - MIN_BS_YEAR];
  if (!row || m < 1 || m > 12) throw new RangeError('Out of range');
  return 29 + Number(row[m - 1]);
}

const yearLength = (y: number) => [...LEN[y - MIN_BS_YEAR]].reduce((s, c) => s + 29 + Number(c), 0);

/** Gregorian date (UTC midnight) for a BS date, or null when the date doesn't exist or is out of range. */
export function bsToAd({ y, m, d }: BsDate): Date | null {
  if (y < MIN_BS_YEAR || y > MAX_BS_YEAR || m < 1 || m > 12 || d < 1 || d > bsMonthLength(y, m)) return null;
  let days = 0;
  for (let yy = MIN_BS_YEAR; yy < y; yy++) days += yearLength(yy);
  for (let mm = 1; mm < m; mm++) days += bsMonthLength(y, mm);
  return new Date(EPOCH + (days + d - 1) * DAY);
}

/** BS date for a Gregorian date (UTC midnight), or null when out of range. */
export function adToBs(date: Date): BsDate | null {
  let days = Math.round((date.getTime() - EPOCH) / DAY);
  if (days < 0) return null;
  for (let y = MIN_BS_YEAR; y <= MAX_BS_YEAR; y++) {
    const yl = yearLength(y);
    if (days >= yl) { days -= yl; continue; }
    for (let m = 1; m <= 12; m++) {
      const ml = bsMonthLength(y, m);
      if (days < ml) return { y, m, d: days + 1 };
      days -= ml;
    }
  }
  return null;
}

/** Gregorian range covered, for messages. */
export const AD_MIN = new Date(EPOCH);
export const AD_MAX = (() => { const d = bsToAd({ y: MAX_BS_YEAR, m: 12, d: bsMonthLength(MAX_BS_YEAR, 12) })!; return d; })();

const NE_DIGITS = '०१२३४५६७८९';
export const neDigits = (s: string | number) => String(s).replace(/[0-9]/g, (c) => NE_DIGITS[Number(c)]);
