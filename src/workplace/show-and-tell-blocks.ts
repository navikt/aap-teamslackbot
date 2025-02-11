const showAndTellBlocks = (datoString: string) => {
    return [
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `:circus_tent: Show & Tell ${datoString} \n Hva har du gjort denne uken som du kan vise eller snakke om i dag?`
        }
    },
    {
        "type": "image",
        "title": {
            "type": "plain_text",
            "text": "image1",
            "emoji": true
        },
        "image_url": "https://cdn.nav.no/aap/aap-teamslackbot/public/showandtell.png",
        "alt_text": "image1"
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Meld inn tema i :thread:"
        }
    }
]
}

module.exports = showAndTellBlocks;