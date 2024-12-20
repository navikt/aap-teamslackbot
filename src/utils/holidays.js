function isTodayAHoliday() {
    const today = new Date();
    const julStart = new Date(today.getFullYear(), 11, 21);
    const julSlutt = new Date(today.getFullYear(), 11, 31);
    const nyttaarStart = new Date(today.getFullYear(), 0, 1);
    const nyttaarSlutt = new Date(today.getFullYear(), 0, 3);

    return ((today >= julStart && today <= julSlutt) || (today >= nyttaarStart && today <= nyttaarSlutt));
}
module.exports = isTodayAHoliday;