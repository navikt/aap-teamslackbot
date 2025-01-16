const {getDayOfYear} = require("date-fns");
const utviklere = [
    '<@UR5LG64LD>',   // Grizzly
    '<@U03LBKLNNAF>', // Vetle
    '<@U07946678MA>', // Henrik Bugge
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
   'U07JHFVRPTM',       // Bin
]
const hentDagensVakt = () => {
    const dayOfYear = getDayOfYear(new Date());
    const vaktIndex = (dayOfYear - 1) % utviklere.length;
    console.log(`dayOfYear: ${dayOfYear}, vaktIndex: ${vaktIndex}`);
    return utviklere[vaktIndex];
}

module.exports = hentDagensVakt;
