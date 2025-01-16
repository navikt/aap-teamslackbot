const vaktBlocks = (dagensVakt) => {
    return [
        {
            "type": "section",
            "text": {
            "type": "mrkdwn",
                "text": `:guardsman: *Dagens tekniske vakt er <${dagensVakt}>*`
            }
        }, {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `< https://www.nav.no | Nyttig link>`,
        }
    },
    ]
}

module.exports = vaktBlocks;
