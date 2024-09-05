const CronJob = require('cron').CronJob
const initWorkplaceBlocks = require("./workplace-blocks")

const TIMEZONE = 'Europe/Oslo'

const now = () => {
    return new Date()
        .toLocaleTimeString('no-NO', { timeZone: TIMEZONE })
}

const setupJob = (app) => {
    const onTick = async () => {
        console.log(`Running job @ ${now()}`)

        const dayNumber = new Date().getDay();
        const title = `Hvor skal du jobbe i dag, ${ukedagNavn(dayNumber)} ${dateString()}?`

        try {
            const result = await app.client.chat.postMessage({
                // channel: 'aap-teamslackbot-test', // Test channel
                channel: 'po-aap-team-aap-privat',
                blocks: initWorkplaceBlocks(title),
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
    const time = '00 07 * * 1-5' // kl 11:11:11, man-fre, alle uker, alle måneder

    console.log(`Init cronjob with crontime: ${time}`)

    const job = new CronJob(time, onTick, null, false, TIMEZONE)

    job.start()
}
function ukedagNavn(dayNumber) {
    const dayNames = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
    return dayNames[dayNumber];
}
function dateString() {
    const today = new Date()
    const monthNames = ['Januar', 'Februar','Mars', 'April','Mai', 'Juni','Juli', 'August','September','Oktober', 'November', 'Desember']
    return `${today.getDate()}. ${monthNames[today.getMonth()]}`
}

module.exports = setupJob
