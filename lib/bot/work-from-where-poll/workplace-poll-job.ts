import { initWorkplaceBlocks } from "@/lib/bot/work-from-where-poll/workplace-blocks";
import { App } from "@slack/bolt";
import { CronJob } from "cron";

const TIMEZONE = "Europe/Oslo";

const now = () => {
  return new Date().toLocaleTimeString("no-NO", { timeZone: TIMEZONE });
};

export function setupWorkplacePollJob(app: App) {
  const onTick = async () => {
    console.log(`Running job @ ${now()}`);

    let title;
    const dayNumber = new Date().getDay();
    if (dayNumber === 5) {
      title = "Endelig helg! :star-struck: Hvor skal du jobbe på mandag?";
    } else {
      title = `Hvor skal du jobbe i morgen, ${ukedagNavn(dayNumber + 1)} ${imorgenDateString()}?`;
    }

    try {
      const result = await app.client.chat.postMessage({
        channel: 'aap-teamslackbot-test', // Test channel
        // channel: "po-aap-team-aap-privat",
        blocks: initWorkplaceBlocks(title),
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
  const time = "28 21 * * 1-5"; // kl 11:11:11, man-fre, alle uker, alle måneder

  console.log(`Init cronjob with crontime: ${time}`);

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
function imorgenDateString() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
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
  return `${tomorrow.getDate()}. ${monthNames[tomorrow.getMonth()]}`;
}