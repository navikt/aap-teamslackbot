const isTodayAHoliday = require("../utils/holidays");
const hentDagensTekniskeVakt = require("./teknisk-vaktliste");
const tekniskVaktBlocks = require("./teknisk-vakt-blocks");
const testoppfolgingVaktBlocks = require("./testoppfolging-vakt-blocks");
const CronJob = require('cron').CronJob
const TIMEZONE = 'Europe/Oslo'

const now = () => {
    return new Date()
        .toLocaleTimeString('no-NO', { timeZone: TIMEZONE })
}

const setupVaktJob = (app) => {
    const onTick = async () => {
        console.log(`Running vakt-job @ ${now()}`)

        if(isTodayAHoliday()){
            console.log('God ferie')
            return
        }

        const dagensVakt = hentDagensTekniskeVakt();

        // TEKNISK VAKT
        try {
            const result = await app.client.chat.postMessage({
                channel: 'aap-teamslackbot-test', // Test channel
                // channel: 'po-aap-team-aap-privat',
                unfurl_links: false,
                blocks: tekniskVaktBlocks(dagensVakt),
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

        //TESTOPPFØLGING VAKT
        try {
            const result = await app.client.chat.postMessage({
                channel: 'aap-teamslackbot-test', // Test channel
                // channel: 'po-aap-team-aap-privat',
                unfurl_links: false,
                blocks: testoppfolgingVaktBlocks(dagensVakt),
                text: 'Should display blocks containing dagens testoppfølgingsvakt'
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

    // const time = '58 07 * * 1-5' // kl 11:11:11, man-fre, alle uker, alle måneder
    const time = '30 20 * * 1-5' // kl 11:11:11, man-fre, alle uker, alle måneder

    console.log(`Init cronjob vaktrotasjon with crontime: ${time}`)

    const job = new CronJob(time, onTick, null, false, TIMEZONE)

    job.start()
}

module.exports = setupVaktJob;
