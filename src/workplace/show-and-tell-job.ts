import {isByWeeklyDate} from "../utils/date";
import {App} from "@slack/bolt";
import {isDateAHoliday} from "../utils/holidays";

const CronJob = require('cron').CronJob
const showAndTellBlocks = require("./show-and-tell-blocks");
const {parse} = require("date-fns");

const TIMEZONE = 'Europe/Oslo'
const startDateBiWeekly = parse('14/02/2025', 'dd/MM/yyyy', new Date())

const now = () => {
    return new Date()
        .toLocaleTimeString('no-NO', { timeZone: TIMEZONE })
}

export function setupShowAndTellJob(app: App) {
    const onTick = async () => {
        console.log(`Running job @ ${now()}`)

        if(isDateAHoliday(new Date())){
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
                channel: 'team-aap-åpen',
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

    // const time = '01 09 * * 5' // kl 11:11:11, man-fre, alle uker, alle måneder
    const time = '59 08 * * 5' // kl 11:11:11, man-fre, alle uker, alle måneder

    console.log(`Init cronjob showandtell with crontime: ${time}`)

    const job = new CronJob(time, onTick, null, false, TIMEZONE)

    job.start()
}
function ukedagNavn(dayNumber: number) {
    const dayNames = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
    return dayNames[dayNumber];
}
function idagDateString() {
    const today = new Date()
    const monthNames = ['Januar', 'Februar','Mars', 'April','Mai', 'Juni','Juli', 'August','September','Oktober', 'November', 'Desember']
    return `${today.getDate()}. ${monthNames[today.getMonth()]}`
}

