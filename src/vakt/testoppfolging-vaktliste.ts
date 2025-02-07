const utviklere = [
    'UTHP0E3N2', // Eirik
    'U06LEHE93GE', // Henning
    'USA3XHAF6', // Sara
    'ULYD63CP6', // Tobias
    'U06BV6T5PP1', // Nina
    'U0162JK5N01', // Jeanette
    'UDZ2TFBA4', // Jostein
    'UD59YS6TC', // Øyvind
]
export function hentDagensTestoppfolgingsVakt() {
    var daysSinceEpoc = Math.floor(Date.now() / 24 / 60 / 60 / 1000)
    var numberOfSaturdaysSinceEpoc = Math.floor((daysSinceEpoc + 4) / 7)
    var numberOfSundaysSinceEpoc = Math.floor((daysSinceEpoc + 5) / 7) ;
    var daysSinceEpocWithoutWeekends = daysSinceEpoc - numberOfSaturdaysSinceEpoc - numberOfSundaysSinceEpoc;
    var vaktIndex = daysSinceEpocWithoutWeekends % utviklere.length

    console.log(`days since epoc without weekends: ${daysSinceEpocWithoutWeekends}, vaktIndex: ${vaktIndex}`);
    return utviklere[vaktIndex];
}

