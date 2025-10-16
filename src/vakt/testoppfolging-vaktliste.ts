import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

const utviklere = [
  'U06BV6T5PP1', // Nina
  'U0162JK5N01', // Jeanette
  'UDZ2TFBA4', // Jostein
  'UD59YS6TC', // Øyvind
  'U089U7GCC7L', // Thea
  'U06LEHE93GE', // Henning
  'USA3XHAF6', // Sara
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

export function hentNesteFemDagersTestoppfolgingsVakter() {
    const daysSinceEpoc = Math.floor(Date.now() / 24 / 60 / 60 / 1000);
    const numberOfSaturdaysSinceEpoc = Math.floor((daysSinceEpoc + 4) / 7);
    const numberOfSundaysSinceEpoc = Math.floor((daysSinceEpoc + 5) / 7);
    const daysSinceEpocWithoutWeekends = daysSinceEpoc - numberOfSaturdaysSinceEpoc - numberOfSundaysSinceEpoc;

    // legger til offset siden vi nå skal poste denne på fredager og vise neste ukes vakter
    const offsetFraFredagUtenHelgedager = 1
    const nesteFemDagerVakter = Array.from({ length: 5 }, (_, index) => {
        const vaktIndex = (daysSinceEpocWithoutWeekends + index + offsetFraFredagUtenHelgedager) % utviklere.length;
        return `${format(new Date(2023, 0, index + 2), 'EEEE', { locale: nb })}: ${utviklere[vaktIndex]}`;
    });

    return nesteFemDagerVakter;
}