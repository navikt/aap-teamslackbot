const vaktBlocks = (dagensTekniskeVakt, dagensTestVakt) => {
    const tekniskVaktTekst = `:guardsman: *Dagens tekniske vakt er <@${dagensTekniskeVakt}>*`;
    const logLink = "<https://logs.adeo.no/app/discover#/view/71a530ed-9b1d-4c5f-bc75-9efcc262323a|Elastic - feil i prod>";
    const grafanaLink = "<https://grafana.nav.cloud.nais.io/explore?schemaVersion=1&panes=%7B%22od8%22:%7B%22datasource%22:%22PD969E40991D5C4A8%22,%22queries%22:%5B%7B%22refId%22:%22A%22,%22expr%22:%22%7Bnamespace%3D%5C%22aap%5C%22%7D%20%7C%3D%20%60%60%20%7C%20json%20%7C%20__error__%3D%60%60%20%7C%20detected_level%20%21%3D%20%60info%60%22,%22queryType%22:%22range%22,%22datasource%22:%7B%22type%22:%22loki%22,%22uid%22:%22PD969E40991D5C4A8%22%7D,%22editorMode%22:%22builder%22%7D%5D,%22range%22:%7B%22from%22:%22now-1h%22,%22to%22:%22now%22%7D%7D%7D&orgId=1|Grafana - Error og Warning i prod>";
    const testVaktTekst = `:test_tube: *Dagens testvakt er <@${dagensTestVakt}>*`;
    return [
        {
            "type": "section",
            "text": {
            "type": "mrkdwn",
                "text": `${tekniskVaktTekst} \n${logLink}\n${grafanaLink}`
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `${testVaktTekst} \nHovedansvar for å følge opp testerene i Teams-kanalen`
            }
        },
    ]
}

module.exports = vaktBlocks;
