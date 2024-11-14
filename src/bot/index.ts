import { App } from "@slack/bolt";
import { setupWorkplacePollJob } from "@/src/bot/work-from-where-poll/workplace-poll-job";
import { setupShowAndTellJob } from "@/src/bot/show-and-tell-post/show-and-tell-job";
import { setupWorkspaceActionListeners } from "@/src/bot/work-from-where-poll/select-workplace-action";
import { setupEventListener } from "@/src/bot/events";

export async function startBot() {
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

  const app = new App({
    socketMode: true,
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    appToken: process.env.SLACK_APP_TOKEN,
    port: PORT,
    customRoutes: [
      {
        path: "/internal/is_alive",
        method: ["GET"],
        handler: (req, res) => {
          res.writeHead(200);
          res.end("OK");
        },
      },
    ],
  });

  (async () => {
    await app.start(PORT);

    setupWorkplacePollJob(app);
    setupShowAndTellJob(app);

    console.log(`⚡️ Bolt app is running on port ${PORT}!`);
  })();

  setupEventListener(app);

  setupWorkspaceActionListeners(app);
}
