export function vaktBlocksMandag(ukensTekniskeVakter: string[],
                                 ukensTestVakter: string[]
) {
    const logLink = "<https://logs.adeo.no/app/discover#/view/71a530ed-9b1d-4c5f-bc75-9efcc262323a|Elastic - feil i prod>";
    const grafanaLink = "<https://grafana.nav.cloud.nais.io/goto/0k4EabAHg?orgId=1|Grafana - Error og Warning i prod>"
    const grafanaDashboardsLink = "<https://grafana.nav.cloud.nais.io/d/deflf77wcdptsd/oversikt-over-aap-dashboard?orgId=1&from=now-6h&to=now&timezone=browser|Grafana - Aap dashboards>"


    const tekniskeVakterListe = ukensTekniskeVakter
        .map((vakt) => `- <@${vakt.split(': ')[1]}>`)
        .join('\n');
    const testVakterListe = ukensTestVakter
        .map((vakt) => `- <@${vakt.split(': ')[1]}>`)
        .join('\n');

    return [
        {
            "type": "divider"
        },
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `*Ukens tekniske vakter:*\n${tekniskeVakterListe}`,
            },
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `\n${logLink}\n${grafanaLink}\n${grafanaDashboardsLink}`
            }
        },
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `*Ukens testvakter:*\n${testVakterListe}`,
            },
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `$\nHovedansvar for å følge opp testerene i Teams-kanalen`
            }
        },
    ]
}
