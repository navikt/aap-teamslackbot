import { showAndTellBlocks } from "@/src/bot/show-and-tell-post/show-and-tell-blocks";
import { CronJob } from "cron";
import { App } from "@slack/bolt";

const TIMEZONE = "Europe/Oslo";

const now = () => {
  return new Date().toLocaleTimeString("no-NO", { timeZone: TIMEZONE });
};

export function setupShowAndTellJob(app: App) {
  const onTick = async () => {
    console.log(`Running job @ ${now()}`);

    const dayNumber = new Date().getDay();
    const datoString = `${ukedagNavn(dayNumber)} ${idagDateString()}?`;

    try {
      const result = await app.client.chat.postMessage({
        channel: 'aap-teamslackbot-test', // Test channel
        // channel: "po-aap-team-aap",
        blocks: showAndTellBlocks(datoString),
        text: "Should display blocks containing buttons to select workplace",
      });

      if (result.ok) {
        console.log("Message sent OK");
      } else {
        console.error(`Error on postMessage: ${result.error}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // const time = '0 */5 10 * * 1-5' // Test cron
  const time = "40 20 * * 5"; // kl 11:11:11, man-fre, alle uker, alle måneder

  console.log(`Init cronjob showandtell with crontime: ${time}`);

  const job = new CronJob(time, onTick, null, false, TIMEZONE);

  job.start();
}
function ukedagNavn(dayNumber: number) {
  const dayNames = [
    "Søndag",
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
  ];
  return dayNames[dayNumber];
}
function idagDateString() {
  const today = new Date();
  const monthNames = [
    "Januar",
    "Februar",
    "Mars",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return `${today.getDate()}. ${monthNames[today.getMonth()]}`;
}
