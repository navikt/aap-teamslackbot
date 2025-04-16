import {isDateAHoliday} from "../utils/holidays";
import {App} from "@slack/bolt";

const CronJob = require('cron').CronJob
const initWorkplaceBlocks = require("./workplace-blocks")

const TIMEZONE = 'Europe/Oslo'

const now = () => {
    return new Date()
        .toLocaleTimeString('no-NO', { timeZone: TIMEZONE })
}

export function setupWorkplaceJob(app: App) {
    const onTick = async () => {
        console.log(`Running job @ ${now()}`)

        if(isDateAHoliday(tomorrowDate())){
            console.log('God ferie')
            return
        }

        let title;
        const dayNumber = new Date().getDay();
        if (dayNumber === 5) {
            title = "Endelig helg! :star-struck: Hvor skal du jobbe på mandag?"
        } else {
            title = `Hvor skal du jobbe i morgen, ${ukedagNavn(dayNumber + 1)} ${imorgenDateString()}?`
        }

        try {
            const result = await app.client.chat.postMessage({
                // channel: 'aap-teamslackbot-test', // Test channel
                channel: 'po-aap-team-aap-privat',
                // channel: 'teamslackbot',
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
    const time = '00 14 * * 1-5' // kl 11:11:11, man-fre, alle uker, alle måneder

    console.log(`Init cronjob with crontime: ${time}`)

    const job = new CronJob(time, onTick, null, false, TIMEZONE)

    job.start()
}
function ukedagNavn(dayNumber: number) {
    const dayNames = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
    return dayNames[dayNumber];
}
function imorgenDateString() {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const monthNames = ['Januar', 'Februar','Mars', 'April','Mai', 'Juni','Juli', 'August','September','Oktober', 'November', 'Desember']
    return `${tomorrow.getDate()}. ${monthNames[tomorrow.getMonth()]}`
}
function tomorrowDate() {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    return tomorrow;
}
