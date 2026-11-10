# bikram-sambat-table

Convert dates between **Bikram Sambat** (BS, Nepal's official calendar) and the
Gregorian calendar (AD), from **BS 2000 to 2090** (14 April 1943 to 13 April 2034).
No dependencies, under 5 KB.

Try it in the browser: [Nepali date converter](https://treeet.com/nepali-date-converter/) ·
[Nepali calendar 2083](https://treeet.com/nepali-calendar-2083/) ·
[Nepali calendar 2084](https://treeet.com/nepali-calendar-2084/)

```sh
npm install bikram-sambat-table
```

```js
import { bsToAd, adToBs, bsMonthLength, BS_MONTHS_EN, BS_MONTHS_NE, neDigits } from 'bikram-sambat-table';

bsToAd({ y: 2084, m: 1, d: 1 });          // Date: 2027-04-14 (UTC)
adToBs(new Date(Date.UTC(2026, 10, 10))); // { y: 2083, m: 7, d: 24 }
bsMonthLength(2083, 2);                   // 31
BS_MONTHS_NE[0];                          // 'बैशाख'
neDigits(2083);                           // '२०८३'
```

## Where the month lengths come from

Nepali months have 29 to 32 days, and the lengths change from year to year. They follow
the calendar Nepal publishes, not a formula, so every converter needs a table. Open-source
tables don't always agree. This one is the day-by-day agreement of six of them
(@inicrea/bikram-sambat-core, nepali-date-library, nepali-date-converter, bikram-sambat-js,
@sbmdkl/nepali-date-converter and nepali-date), decided month by month where they differ.
Each year is stored as 12 digits, so the whole table is one short array.

Years after the last calendar Nepal has published are projections in every source.
Check the official patro for holidays.

## API

| Export | What it is |
|---|---|
| `bsToAd({ y, m, d })` | a UTC `Date`, or `null` outside the table |
| `adToBs(date)` | `{ y, m, d }` (uses the date's UTC day), or `null` outside the table |
| `bsMonthLength(y, m)` | days in that month (29–32) |
| `MIN_BS_YEAR`, `MAX_BS_YEAR`, `AD_MIN`, `AD_MAX` | the range covered |
| `BS_MONTHS_EN`, `BS_MONTHS_NE`, `WEEKDAYS_NE` | month and weekday names |
| `neDigits(x)` | Western digits to Nepali digits |

Months are 1–12, starting with Baisakh.

## Licence

MIT © Osama Mumtaz. Made for [Treeet](https://treeet.com/), free file tools that run in your browser.
