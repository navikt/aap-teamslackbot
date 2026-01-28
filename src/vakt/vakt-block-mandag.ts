export function vaktBlocksFredag(
  nesteUkesTekniskeVakter: string[],
  nesteUkesTestVakter: string[]
) {
    const rutineLink = "<https://confluence.adeo.no/x/xzA1Jg|Rutine>";

    const tekniskeVakterListe = nesteUkesTekniskeVakter
        .map((vakt) => `<@${vakt}>`)
        .join(', ');
    const testVakterListe = nesteUkesTestVakter
        .map((vakt) => `${vakt.split(': ')[0]} - <@${vakt.split(': ')[1]}>`)
        .join('\n');

    return [
        {
            "type": "divider"
        },
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `${rutineLink}\n`
            }
        },
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `*Neste ukes tekniske vakter:*\n${tekniskeVakterListe}`,
            },
        },
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `*Neste ukes funksjonelle vakter:*\n${testVakterListe}`,
            },
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `\n<@U01PB1AMGJE> har hovedansvar for å følge opp testerene i Teams-kanalen` // Else Marie
            }
        },
    ]
}
