const utviklere = [
  'U0184NNTXL5' ,     // Peter
  // 'U03HT22GCBU',      // Thomas
  'U02EFCUUQF8',      // Tor
  'U03LBKLNNAF',      // Vetle
  'U07946678MA',      // Henrik Bugge
  'U076BSY04G3',      // Fredrik
  'U7SRD021L',        // Frode
  'U075X6VRNLF',      // Ine
  'U0115SZM8PQ',      // Charlie
  'U01CH1LE2FK',      // Nicolas
  'U08EGKCC8FM',      // Selma
  'U08MD6XU9K6',      // Greger
  'U02TAL2D5L2',      // Henrik Gundersen
  'U64P58KM3',        // Steffen
  'U60QWL9LN',        // Hein
  'UAU5L6EJZ',        // Thao
  'U08PP82948K',      // Martin
  'U08RKTS9N23',      // Simen
  'UEHPV7NAE',        // Matias
  'U02KTLW1QLC',      // Øivind
]


/*

  'U01CH1LE2FK',      // Nicolas
  'U08EGKCC8FM',      // Selma
  'U03LBKLNNAF',      // Vetle
 */
export function hentDagensTekniskeVakt() {
    var daysSinceEpoc = Math.floor(Date.now() / 24 / 60 / 60 / 1000)
    var numberOfSaturdaysSinceEpoc = Math.floor((daysSinceEpoc + 4) / 7)
    var numberOfSundaysSinceEpoc = Math.floor((daysSinceEpoc + 5) / 7) ;
    var daysSinceEpocWithoutWeekends = daysSinceEpoc - numberOfSaturdaysSinceEpoc - numberOfSundaysSinceEpoc;
    var vaktIndex = daysSinceEpocWithoutWeekends % utviklere.length

    console.log(`days since epoc without weekends: ${daysSinceEpocWithoutWeekends}, vaktIndex: ${vaktIndex}`);
    return utviklere[vaktIndex];
}

export function hentNesteUkesTekniskeVakter() {
    const ukedager = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag'];
    const daysSinceEpoc = Math.floor(Date.now() / 24 / 60 / 60 / 1000);
    const numberOfSaturdaysSinceEpoc = Math.floor((daysSinceEpoc + 4) / 7);
    const numberOfSundaysSinceEpoc = Math.floor((daysSinceEpoc + 5) / 7);
    const daysSinceEpocWithoutWeekends = daysSinceEpoc - numberOfSaturdaysSinceEpoc - numberOfSundaysSinceEpoc;

    // legger til offset siden vi nå skal poste denne på fredager og vise neste ukes vakter
    const offsetFraFredagUtenHelgedager = 1
    const ukensVakter = ukedager.map((dag, index) => {
        const vaktIndex = (daysSinceEpocWithoutWeekends + index + offsetFraFredagUtenHelgedager) % utviklere.length;
        return `${dag}: ${utviklere[vaktIndex]}`;
    });

    return ukensVakter;
}