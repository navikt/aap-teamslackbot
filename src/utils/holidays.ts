import { isEqual } from "date-fns";

export function isDateAHoliday(day: Date) {
    const påskeStart = new Date(day.getFullYear(), 3, 17);
    const påskeSlutt = new Date(day.getFullYear(), 3, 21);
    const førsteMai = new Date(day.getFullYear(), 4, 1);
    const julStart = new Date(day.getFullYear(), 11, 21);
    const julSlutt = new Date(day.getFullYear(), 11, 31);
    const nyttaarStart = new Date(day.getFullYear(), 0, 1);
    const nyttaarSlutt = new Date(day.getFullYear(), 0, 3);

    return (day >= julStart && day <= julSlutt)
      || (day >= nyttaarStart && day <= nyttaarSlutt)
      || (day >= påskeStart && day <= påskeSlutt)
      || isEqual(day,førsteMai);
}
