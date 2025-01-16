const isTodayAHoliday = require("../utils/holidays");
// const hentDagensVakt = require("./vaktliste");
const vaktBlocks = require("./vakt-blocks");
const CronJob = require('cron').CronJob
const TIMEZONE = 'Europe/Oslo'

const setupVaktJob = (app) => {
    const onTick = async () => {
        console.log(`Running vakt-job @ ${now()}`)

        if(isTodayAHoliday()){
            console.log('God ferie')
            return
        }

        // const dagensVakt = hentDagensVakt();

        try {
            const result = await app.client.chat.postMessage({
                channel: 'aap-teamslackbot-test', // Test channel
                // channel: 'po-aap-team-aap',
                // channel: 'teamslackbot',
                blocks: vaktBlocks('testperson'),
                text: 'Should display blocks containing dagens tekniske vakt'
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
    const time = '10 15 * * 1-5' // kl 11:11:11, man-fre, alle uker, alle måneder

    console.log(`Init cronjob vaktrotasjon with crontime: ${time}`)

    const job = new CronJob(time, onTick, null, false, TIMEZONE)

    job.start()
}

module.exports = setupVaktJob;
