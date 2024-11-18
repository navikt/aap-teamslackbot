import createApp from './app'
import { setupWorkplacePollJob } from "@/lib/bot/work-from-where-poll/workplace-poll-job";
import { setupShowAndTellJob } from "@/lib/bot/show-and-tell-post/show-and-tell-job";
import { setupWorkspaceActionListeners } from "@/lib/bot/work-from-where-poll/select-workplace-action";
import { setupEventListener } from "@/lib/bot/events";
import {botLogger} from "@/lib/bot/bot-logger";

const handlers = [
  setupWorkplacePollJob,
  setupShowAndTellJob,
  setupEventListener,
  setupWorkspaceActionListeners,
]
export async function startBot() {
  botLogger.info("setting up bot");

  const app = createApp()
  handlers.forEach((handler) => handler(app))
  await app.start()

  botLogger.info(`Started bolt app in socket mode`)
}
