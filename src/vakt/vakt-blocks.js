const vaktBlocks = (dagensVakt) => {
    const vaktTekst = `:guardsman: *Dagens tekniske vakt er <${dagensVakt}>*`;
    return [
        {
            "type": "section",
            "text": {
            "type": "mrkdwn",
                "text": vaktTekst,
            }
        }, {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "< https://www.nav.no | Nyttig link>",
        }
    },
    ]
}

module.exports = vaktBlocks;
