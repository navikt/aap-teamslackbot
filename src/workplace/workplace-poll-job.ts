import {isDateAHoliday} from "../utils/holidays";
import {imorgenDateString, tomorrowDate, ukedagNavn} from "../utils/date";
import {App} from "@slack/bolt";
import {addDays} from "date-fns";

const CronJob = require('cron').CronJob
const initWorkplaceBlocks = require("./workplace-blocks")
const initWorkplaceMigreringBlocks = require("./workplace-migrering-blocks")

const TIMEZONE = 'Europe/Oslo'

const channelsAndBlocks = [
    { channel: 'C067RJV8F89', initBlocks: initWorkplaceBlocks }, // #team-aap-privat
    { channel: 'C0ACRS43KGA', initBlocks: initWorkplaceMigreringBlocks }, // #team-aap-ut-av-arena-inn-i-kelvin-privat
]

const now = () => {
    return new Date()
        .toLocaleTimeString('no-NO', { timeZone: TIMEZONE })
}

export function setupWorkplaceJob(app: App) {
    const onTick = async () => {
        console.log(`Running job @ ${now()}`)
        const dayNumber = new Date().getDay();
        const checkDate = dayNumber === 5
            ? addDays(new Date(),3)
          : tomorrowDate();

        if(isDateAHoliday(checkDate)){
            console.log('God ferie')
            return
        }

        let title;
        if (dayNumber === 5) {
            title = "Endelig helg! :star-struck: Hvor skal du jobbe på mandag?"
        } else {
            title = `Hvor skal du jobbe i morgen, ${ukedagNavn(dayNumber + 1)} ${imorgenDateString()}?`
        }

        try {
            const promises = channelsAndBlocks.map(async ({channel, initBlocks}) => {
                const result = await app.client.chat.postMessage({
                    channel,
                    blocks: initBlocks(title),
                    text: 'Should display blocks containing buttons to select workplace'
                })

                if (result.ok) {
                    console.log(`Message sent OK for channel: ${channel}`);
                } else {
                    console.error(`Error on postMessage for channel: ${channel}: ${result.error}`)
                }
            })
            await Promise.all(promises)
        } catch (e) {
            console.error(e)
        }
    };

    // const time = '0 */5 10 * * 1-5' // Test cron
    const time = '00 14 * * 1-5' // kl 14:00:00, man-fre, alle uker, alle måneder

    console.log(`Init cronjob with crontime: ${time}`)

    const job = new CronJob(time, onTick, null, false, TIMEZONE)

    job.start()
}
