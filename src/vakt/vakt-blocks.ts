export function vaktBlocks(dagensTekniskeVakt: string, dagensTestVakt: string) {
    const tekniskVaktTekst = `:guardsman: *Dagens tekniske vakt er <@${dagensTekniskeVakt}>*\nGruppen <@aap-teknisk-vakt> oppdateres med dagens vakt og kan brukes i stedet for navnet til vakten`;
    const logLink = "<https://logs.adeo.no/app/discover#/view/71a530ed-9b1d-4c5f-bc75-9efcc262323a|Elastic - feil i prod>";
    const grafanaLink = "<https://grafana.nav.cloud.nais.io/goto/0k4EabAHg?orgId=1|Grafana - Error og Warning i prod>"
    const grafanaDashboardsLink = "<https://grafana.nav.cloud.nais.io/d/deflf77wcdptsd/oversikt-over-aap-dashboard?orgId=1&from=now-6h&to=now&timezone=browser|Grafana - Aap dashboards>"
    const testVaktTekst = `:test_tube: *Dagens funksjonelle vakt er <@${dagensTestVakt}>*`;
    return [
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
            "type": "mrkdwn",
                "text": `${tekniskVaktTekst} \n${logLink}\n${grafanaLink}\n${grafanaDashboardsLink} `
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `${testVaktTekst}`
            }
        },
    ]
}
