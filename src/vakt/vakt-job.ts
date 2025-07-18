import {hentDagensTekniskeVakt, hentUkensTekniskeVakter} from "./teknisk-vaktliste";
import {hentDagensTestoppfolgingsVakt, hentNesteFemDagersTestoppfolgingsVakter} from "./testoppfolging-vaktliste";
import {vaktBlocks} from "./vakt-blocks";
import {App} from "@slack/bolt";
import {CronJob} from "cron";
import {isDateAHoliday} from "../utils/holidays";
import { isMonday } from "date-fns";
import {vaktBlocksMandag} from "./vakt-block-mandag";

const TIMEZONE = 'Europe/Oslo'

const now = () => {
    return new Date()
        .toLocaleTimeString('no-NO', { timeZone: TIMEZONE })
}

export function setupVaktJob(app: App) {
    const onTick = async () => {
        console.log(`Running vakt-job @ ${now()}`)

        const today = new Date();

        if(isDateAHoliday(today)){
            console.log('God ferie')
            return
        }


        const dagensTekniskeVakt = hentDagensTekniskeVakt();
        const dagensTestVakt = hentDagensTestoppfolgingsVakt();

        const blocks = isMonday(today)
            ? vaktBlocksMandag(
                hentUkensTekniskeVakter(),
                hentNesteFemDagersTestoppfolgingsVakter()
            )
            : vaktBlocks(dagensTekniskeVakt, dagensTestVakt);

        try {
            const result = await app.client.chat.postMessage({
                // channel: 'aap-teamslackbot-test', // Test channel
                channel: 'po-aap-team-aap',
                unfurl_links: false,
                blocks: blocks,
                text: isMonday(today)
                    ? 'Should display blocks containing weekly shifts'
                    : 'Should display blocks containing dagens tekniske vakt',
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

    const time = '58 07 * * 1-5' // kl 11:11:11, man-fre, alle uker, alle måneder

    console.log(`Init cronjob vaktrotasjon with crontime: ${time}`)

    const job = new CronJob(time, onTick, null, false, TIMEZONE)

    job.start()
}

