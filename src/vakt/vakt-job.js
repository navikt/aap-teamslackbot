const isTodayAHoliday = require("../utils/holidays");
const hentDagensVakt = require("./vaktliste");
const vaktBlocks = require("./vakt-blocks");
const showAndTellBlocks = require("../workplace/show-and-tell-blocks");
const CronJob = require('cron').CronJob

const setupVaktJob = (app) => {
    const onTick = async () => {
        console.log(`Running vakt-job @ ${now()}`)

        if(isTodayAHoliday()){
            console.log('God ferie')
            return
        }

        const dagensVakt = hentDagensVakt();

        try {
            const result = await app.client.chat.postMessage({
                channel: 'aap-teamslackbot-test', // Test channel
                // channel: 'po-aap-team-aap',
                // channel: 'teamslackbot',
                blocks: vaktBlocks(dagensVakt),
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
    const time = '25 12 * * 5' // kl 11:11:11, man-fre, alle uker, alle måneder

    console.log(`Init cronjob showandtell with crontime: ${time}`)

    const job = new CronJob(time, onTick, null, false, TIMEZONE)

    job.start()
}

module.exports = setupVaktJob;
