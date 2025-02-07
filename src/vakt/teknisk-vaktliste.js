const utviklere = [
    'UR5LG64LD',   // Grizzly
    'U03LBKLNNAF', // Vetle
    'U07946678MA', // Henrik Bugge
    'U06UGEL1XFD',      // Alexander
    'U076BSY04G3',      // Fredrik
    'U7SRD021L',        // Frode
    'U075Y4DREES',      // Jackson
    'U075X6VRNLF',      // Ine
    'U6P86PP98',        // Marius
    'UEHPV7NAE',        // Matias
    'U02KTLW1QLC',      // Øivind
   'U0184NNTXL5' ,      // Peter
    'U03HT22GCBU',      // Thomas
    'U02EFCUUQF8',      // Tor
]
const hentDagensTekniskeVakt = () => {
    var daysSinceEpoc = Math.floor(Date.now() / 24 / 60 / 60 / 1000)
    var numberOfSaturdaysSinceEpoc = Math.floor((daysSinceEpoc + 4) / 7)
    var numberOfSundaysSinceEpoc = Math.floor((daysSinceEpoc + 5) / 7) ;
    var daysSinceEpocWithoutWeekends = daysSinceEpoc - numberOfSaturdaysSinceEpoc - numberOfSundaysSinceEpoc;
    var vaktIndex = daysSinceEpocWithoutWeekends % utviklere.length

    console.log(`days since epoc without weekends: ${daysSinceEpocWithoutWeekends}, vaktIndex: ${vaktIndex}`);
    return utviklere[vaktIndex];
}

module.exports = hentDagensTekniskeVakt;
