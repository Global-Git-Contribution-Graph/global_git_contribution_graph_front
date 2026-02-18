export type HistoryPoint = { date: string; contributionCount: number };

export type HeatCell = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type HeatWeek = HeatCell[]; // lenght 7, order: sunday -> saturday

function toLevel(count: number): HeatCell["level"] {
    if (count <= 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
}

function pad2(n: number) {
    return String(n).padStart(2, "0");
}

// local format “YYYY-MM-DD” in UTC to avoid time zone bugs
function formatYMD(d: Date): string {
    const y = d.getUTCFullYear();
    const m = pad2(d.getUTCMonth() + 1);
    const day = pad2(d.getUTCDate());
    return `${y}-${m}-${day}`;
}

function addDaysUTC(d: Date, days: number): Date {
    const copy = new Date(d.getTime());
    copy.setUTCDate(copy.getUTCDate() + days);
    return copy;
}

// returns sunday (00:00 UTC) of the week containing `today`
function startOfWeekSundayUTC(today: Date): Date {
    // getUTCDay: sunday=0 ... saturday=6
    const offset = today.getUTCDay();
    const atMidnight = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    return addDaysUTC(atMidnight, -offset);
}

export function buildHeatmapWeeks(history: HistoryPoint[], weeksCount = 52): HeatWeek[] {
    // 1) index rapide par date
    const countByDate: Record<string, number> = {};
    for (const day of history) countByDate[day.date] = day.contributionCount;

    // 2) calcul plage 52 semaines alignée dimanche
    const endSunday = startOfWeekSundayUTC(new Date());
    const start = addDaysUTC(endSunday, -(weeksCount - 1) * 7);

    // 3) construire semaines
    const weeks: HeatWeek[] = [];
    for (let w = 0; w < weeksCount; w++) {
        const week: HeatWeek = [];
        const weekStart = addDaysUTC(start, w * 7);

        for (let i = 0; i < 7; i++) {
            const day = addDaysUTC(weekStart, i);
            const date = formatYMD(day);
            const count = countByDate[date] ?? 0;
            week.push({ date, count, level: toLevel(count) });
        }
        weeks.push(week);
    }

    return weeks;
}
