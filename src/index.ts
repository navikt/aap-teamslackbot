const {App} = require("@slack/bolt");
const setupWorkplaceJob = require('./workplace/workplace-poll-job')
const setupWorkplaceAction = require("./workplace/select-workplace-action");
const setupEventListener = require("src/events");
const setupShowAndTellJob = require("./workplace/show-and-tell-job");
const setupVaktJob = require('./vakt/vakt-job');


const PORT = process.env.PORT || 3000

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
            handler: (req, res) => {
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
