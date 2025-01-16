const vaktBlocks = (dagensVakt) => {
    const vaktTekst = `:guardsman: *Dagens tekniske vakt er <@${dagensVakt}>*`;
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
                "text": "< https://logs.adeo.no/app/discover#/view/71a530ed-9b1d-4c5f-bc75-9efcc262323a | Elastic - feil i prod>",
        }
    },
    ]
}

module.exports = vaktBlocks;
