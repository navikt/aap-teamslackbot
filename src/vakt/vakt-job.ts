import {hentDagensTekniskeVakt, hentNesteUkesTekniskeVakter} from "./teknisk-vaktliste";
import {hentDagensTestoppfolgingsVakt, hentNesteFemDagersTestoppfolgingsVakter} from "./testoppfolging-vaktliste";
import {vaktBlocks} from "./vakt-blocks";
import {App} from "@slack/bolt";
import {CronJob} from "cron";
import {isDateAHoliday} from "../utils/holidays";
import {isFriday, isMonday} from "date-fns";
import {vaktBlocksFredag} from "./vakt-block-mandag";

const TIMEZONE = 'Europe/Oslo'

const now = () => {
    return new Date()
        .toLocaleTimeString('no-NO', {timeZone: TIMEZONE})
}

export function setupVaktJob(app: App) {
    const onTick = async () => {
        console.log(`Running vakt-job @ ${now()}`)

        const today = new Date();

        if (isDateAHoliday(today)) {
            console.log('God ferie')
            return
        }


        const dagensTekniskeVakt = hentDagensTekniskeVakt();
        const dagensTestVakt = hentDagensTestoppfolgingsVakt();

        const dailyBlocks = vaktBlocks(dagensTekniskeVakt, dagensTestVakt);

        try {
            const result = await app.client.chat.postMessage({
                // channel: 'aap-teamslackbot-test', // Test channel
                channel: 'team-aap-åpen',
                unfurl_links: false,
                blocks: dailyBlocks,
                text: 'Should display blocks containing dagens tekniske vakt',
            })

            if (result.ok) {
                console.log('Message sent OK')
            } else {
                console.error(`Error on postMessage: ${result.error}`)
            }
        } catch (e) {
          console.error(e)
        }

        if(isFriday(today)) {
          try {
            const result = await app.client.chat.postMessage({
              // channel: 'aap-teamslackbot-test', // Test channel
              channel: 'team-aap-åpen',
              unfurl_links: false,
              blocks: vaktBlocksFredag(
                hentNesteUkesTekniskeVakter(),
                hentNesteFemDagersTestoppfolgingsVakter()
              ),
              text: 'Should display blocks containing dagens tekniske vakt',
            })

            if (result.ok) {
              console.log('Message sent OK')
            } else {
              console.error(`Error on postMessage: ${result.error}`)
            }
          } catch (e) {
            console.error(e)
          }
        }
    };

    const time = '58 07 * * 1-5' // kl 11:11:11, man-fre, alle uker, alle måneder

    console.log(`Init cronjob vaktrotasjon with crontime: ${time}`)

    const job = new CronJob(time, onTick, null, false, TIMEZONE)

    job.start()
}

export function updateVaktUserGroup(app: App) {
  async function onTick() {
    const res = await app.client.usergroups.users.update({
      usergroup: 'S09PXJ3DJQ2',
      users: 'U02EFCUUQF8',
    });
    console.log('oppdatert gruppe')
    console.log(res)
  }
  const time = '17 15 * * 1-5' // kl 11:11:11, man-fre, alle uker, alle måneder
  console.log(`Init cronjob oppdatergruppe with crontime: ${time}`)
  const job = new CronJob(time, onTick, null, false, TIMEZONE)

  job.start()

}