const CronJob = require('cron').CronJob
const showAndTellBlocks = require("./show-and-tell-blocks");
const isByWeeklyDate = require("../utils/date");
const isTodayAHoliday = require("../utils/holidays");
const {parse} = require("date-fns");

const TIMEZONE = 'Europe/Oslo'
const startDateBiWeekly = parse('20/12/2024', 'dd/MM/yyyy', new Date())

const now = () => {
    return new Date()
        .toLocaleTimeString('no-NO', { timeZone: TIMEZONE })
}

const setupShowAndTellJob = (app) => {
    const onTick = async () => {
        console.log(`Running job @ ${now()}`)

        if(isTodayAHoliday()){
            console.log('God ferie')
            return
        }

        const isByWeekly = isByWeeklyDate(startDateBiWeekly, new Date());
        if(!isByWeekly) {
            console.log(`Hopper over denne fredagen, bare annen hver`)
            return;
        }

        const dayNumber = new Date().getDay();
        const datoString = `${ukedagNavn(dayNumber)} ${idagDateString()}?`

        try {
            const result = await app.client.chat.postMessage({
                // channel: 'aap-teamslackbot-test', // Test channel
                channel: 'po-aap-team-aap',
                // channel: 'teamslackbot',
                blocks: showAndTellBlocks(datoString),
                text: 'Should display blocks containing buttons to select workplace'
            })

            if (result.ok) {
                console.log('Message sent OK')
            } else {
                console.error(`Error on postMessage: ${result.error}`)
            }
        } catch (e) {
            console.error(e)
        }
    };

    // const time = '0 */5 10 * * 1-5' // Test cron
    const time = '01 09 * * 5' // kl 11:11:11, man-fre, alle uker, alle måneder

    console.log(`Init cronjob showandtell with crontime: ${time}`)

    const job = new CronJob(time, onTick, null, false, TIMEZONE)

    job.start()
}
function ukedagNavn(dayNumber) {
    const dayNames = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
    return dayNames[dayNumber];
}
function idagDateString() {
    const today = new Date()
    const monthNames = ['Januar', 'Februar','Mars', 'April','Mai', 'Juni','Juli', 'August','September','Oktober', 'November', 'Desember']
    return `${today.getDate()}. ${monthNames[today.getMonth()]}`
}

module.exports = setupShowAndTellJob
