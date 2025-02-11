import {ParamsIncomingMessage} from "@slack/bolt/dist/receivers/ParamsIncomingMessage";
import {ServerResponse} from "http";

import {App} from "@slack/bolt";
import {setupVaktJob} from "src/vakt/vakt-job";
import {setupShowAndTellJob} from "src/workplace/show-and-tell-job";
import {setupEventListener} from "src/events";
import {setupWorkplaceJob} from "src/workplace/workplace-poll-job";
import {setupWorkplaceAction} from "src/workplace/select-workplace-action";


const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000

const app = new App({
    socketMode: true,
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    appToken: process.env.SLACK_APP_TOKEN,
    port: PORT,
    customRoutes: [
        {
            path: '/internal/is_alive',
            method: ['GET'],
            handler: (_req: ParamsIncomingMessage, res: ServerResponse) => {
                res.writeHead(200)
                res.end('OK')
            }
        }
    ]
});

(async () => {
    await app.start(PORT);

    setupWorkplaceJob(app);
    setupShowAndTellJob(app);
    setupVaktJob(app);

    console.log(`⚡️ Bolt app is running on port ${PORT}!`);
})();

setupEventListener(app);

setupWorkplaceAction(app);
