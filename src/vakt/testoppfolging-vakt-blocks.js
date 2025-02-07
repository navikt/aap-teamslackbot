const tekniskVaktBlocks = (dagensVakt) => {
    const vaktTekst = `:guardsman: *Dagens testvakt er <@${dagensVakt}>*`;
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
                "text": "Hovedansvar for å følge opp testerene i Teams-kanalen",
            }
        },
    ]
}

module.exports = tekniskVaktBlocks;
