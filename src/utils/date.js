const {differenceInDays} = require("date-fns")
function isByWeeklyDate(startDate, compareDate) {
    const dagerForskjell = differenceInDays(compareDate, startDate);
    const rest = dagerForskjell%14;
    return rest === 0;
}
module.exports = isByWeeklyDate
